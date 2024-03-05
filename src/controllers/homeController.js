const getHomePage = (req, res) => {
  res.send(`
            <h1>Hello World!</h1>
          `);
};

const getSample = (req, res) => {
  res.render("sample.ejs");
};

module.exports = {
  getHomePage,
  getSample,
};
