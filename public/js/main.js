const db = require('../../models');

const handleClick = () => {
     window.location.href = '/auth/signup';
};

document.getElementById('registerbtn').addEventListener('click', handleClick);
