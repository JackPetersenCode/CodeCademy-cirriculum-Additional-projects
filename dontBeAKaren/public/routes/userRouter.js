

const getBusiness = async() => {
    console.log('boo')
    const business = Business.findAll({ where: {
        [Op.like]: [{ name: `%${searchQuery}`}]
    }})
    return business
}