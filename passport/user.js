module.exports = {
    login: (req, res) => {
      const { user } = req
      res.json(user)
    }
}