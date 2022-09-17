from django.shortcuts import redirect
from multiprocessing import context, get_context
from django.shortcuts import render
from django.urls import reverse_lazy
from .models import MenuItem, RecipeRequirement, Ingredient, Purchase
from .forms import MenuItemCreateForm, RecipeRequirementCreateForm, IngredientCreateForm, PurchaseCreateForm
from django.views.generic import ListView, TemplateView, DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.contrib.messages.views import SuccessMessageMixin
from django.core.exceptions import ValidationError
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required 
from django.db.models import Sum, F

class SignUp(CreateView):
  form_class = UserCreationForm
  success_url = reverse_lazy("login")
  template_name = "registration/signup.html"
  
def logout_view(request):
  logout(request)
  return redirect("home")

class HomeView(LoginRequiredMixin, TemplateView):
    template_name = "inventory/home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["name"] = self.request.user
        context["recipe_requirements"] = RecipeRequirement.objects.all()
        context["ingredients"] = Ingredient.objects.all()
        context["menu_items"] = MenuItem.objects.all()
        context["purchases"] = Purchase.objects.all()
        return context

class IngredientList(LoginRequiredMixin, ListView):
    model = Ingredient
    template_name: "inventory/ingredient_list.html"
    
class IngredientUpdate(LoginRequiredMixin, UpdateView):
    model = Ingredient
    template_name = "inventory/ingredient_update.html"
    fields = ["name", "quantity", "unit", "unit_price"]
    success_url = reverse_lazy('ingredientlist')
    success_message = 'ingredient updated'

class IngredientCreate(LoginRequiredMixin, CreateView):
    model = Ingredient
    form_class = IngredientCreateForm
    template_name = "inventory/ingredient_create.html"

    #fields = ["name", "quantity", "unit", "unit_price"]
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["ingredients"] = [X for X in Ingredient.objects.all()]
        print(context["ingredients"])
        return context

    def post(self, request):
        form = self.form_class(request.POST)
        if form.is_valid():
            name = request.POST['name']
            quantity = request.POST['quantity']
            unit = request.POST['unit']
            unit_price = request.POST['unit_price']
            for ingredient in Ingredient.objects.all():
                if ingredient.name == request.POST['name']:
                    print('INGREDIENT ALREADY EXISTS')
                    return redirect('/ingredient/list')
            new_ingredient = Ingredient.create_ingredient(name, quantity, unit, unit_price)
            new_ingredient.save()
        return redirect('/ingredient/list')
        

            #success_url = reverse_lazy('ingredientlist')
            #success_message = 'new ingredient added'

class IngredientDelete(LoginRequiredMixin, DeleteView):
    model = Ingredient
    template_name = "inventory/ingredient_delete.html"
    success_url = reverse_lazy('ingredientlist')
    success_message = 'ingredient deleted '

class MenuItemList(LoginRequiredMixin, ListView):
    model = MenuItem
    template_name: "inventory/menuitem_list.html"

class MenuItemUpdate(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    model = MenuItem
    template_name = "inventory/menuitem_update.html"
    form_class = MenuItemCreateForm
    success_url = reverse_lazy('menuitemlist')
    success_message = 'menu item update'

class MenuItemCreate(LoginRequiredMixin, SuccessMessageMixin, CreateView):
    model = MenuItem
    template_name = "inventory/menuitem_create.html"
    form_class = MenuItemCreateForm
    success_url = reverse_lazy('menuitemlist')
    success_message = 'new menu item added'

class MenuItemDelete(LoginRequiredMixin, SuccessMessageMixin, DeleteView):
    model = MenuItem
    template_name = "inventory/menuitem_delete.html"
    success_url = reverse_lazy('menuitemlist')
    success_message = 'menu item deleted  '

class RecipeRequirementList(LoginRequiredMixin, ListView):
    model = RecipeRequirement
    template_name: "inventory/reciperequirement_list.html"

class RecipeRequirementUpdate(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    model = RecipeRequirement
    template_name = "inventory/reciperequirement_update.html"
    form_class = RecipeRequirementCreateForm
    success_url = reverse_lazy('reciperequirementlist')
    success_message = 'recipe requirement update'

class RecipeRequirementCreate(LoginRequiredMixin, SuccessMessageMixin, CreateView):
    model = RecipeRequirement
    template_name = "inventory/reciperequirement_create.html"
    form_class = RecipeRequirementCreateForm
    success_url = reverse_lazy('reciperequirementlist')
    success_message = 'new recipe requirement added'

class RecipeRequirementDelete(LoginRequiredMixin, SuccessMessageMixin, DeleteView):
    model = RecipeRequirement
    template_name = "inventory/reciperequirement_delete.html"
    success_url = reverse_lazy('reciperequirementlist')
    success_message = 'recipe requirement deleted'

class PurchaseList(LoginRequiredMixin, ListView):
    model = Purchase
    template_name = "inventory/purchase_list.html"

class PurchaseUpdate(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    model = Purchase
    template_name = "inventory/purchase_update.html"
    form_class = PurchaseCreateForm
    success_url = reverse_lazy('purchaselist')
    success_message = 'purchase updated'

class PurchaseCreate(LoginRequiredMixin, SuccessMessageMixin, CreateView):
    model = Purchase
    template_name = "inventory/purchase_create.html"
    form_class = PurchaseCreateForm
    #success_url = reverse_lazy('purchaselist')
    #success_message = 'new purchase added'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["menu_items"] = [X for X in MenuItem.objects.all() if X.available()]
        print(context["menu_items"])
        return context
        
    def post(self, request):
        menu_item_id = request.POST['menu_item']
        menu_item = MenuItem.objects.get(pk=menu_item_id)
        requirements = menu_item.reciperequirement_set
        purchase = Purchase(menu_item=menu_item)
        for requirement in requirements.all():
            required_ingredient = requirement.ingredient
            print(required_ingredient.quantity)
            if required_ingredient.quantity < requirement.quantity:
                raise ValidationError(f"Not enough {required_ingredient} in the inventory!")
            required_ingredient.quantity -= requirement.quantity
            print(required_ingredient.quantity)
            required_ingredient.save()
        purchase.save()
        return redirect('/purchase/list')

class PurchaseDelete(LoginRequiredMixin, SuccessMessageMixin, DeleteView):
    model = Purchase
    template_name = "inventory/purchase_delete.html"
    success_url = reverse_lazy('purchaselist')
    success_message = 'purchase deleted'

class ReportView(LoginRequiredMixin, TemplateView):
    template_name = "inventory/reports.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["purchases"] = Purchase.objects.all()
        revenue = Purchase.objects.aggregate(
            revenue=Sum("menu_item__price"))["revenue"]
        total_cost = 0
        for purchase in Purchase.objects.all():
            for recipe_requirement in purchase.menu_item.reciperequirement_set.all():
                total_cost += recipe_requirement.ingredient.unit_price * recipe_requirement.quantity

        context["revenue"] = revenue
        context["total_cost"] = total_cost
        context["profit"] = revenue - total_cost

        return context