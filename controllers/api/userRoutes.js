const router = require('express').Router();
const { User, userCottesloe, userKingspark } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new user
// root/api/users/signup
router.post('/signup', async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await userCottesloe.create({
      sequence: 1,
      user_id: dbUserData.id
    });

    await userKingspark.create({
      sequence: 1,
      user_id: dbUserData.id
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// LOGIN users
// root/api/users/login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// root/api/users/logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/:location', withAuth, async (req, res) => {
  const location = req.params.location;

  switch (location) {
    // root/api/users/cottesloe
    case 'cottesloe':
      try {
        const cottesloeData = await userCottesloe.findAll({ where: { user_id: req.session.user_id } });

        const adventures = cottesloeData.map(adventureInfo => adventureInfo.get({ plain: true }));
        const adventure = adventures[0];

        res.json(adventure)
      } catch (err) {
        res.status(400).json(err);
      }
      break;
    // root/api/users/kingspark
    case 'kingspark':
      try {
        const kingsparkData = await userKingspark.findAll({ where: { user_id: req.session.user_id } });

        const adventures = kingsparkData.map(adventureInfo => adventureInfo.get({ plain: true }));
        const adventure = adventures[0];

        res.json(adventure)
      } catch (err) {
        res.status(400).json(err);
      }
      break;

  }
});


module.exports = router;
