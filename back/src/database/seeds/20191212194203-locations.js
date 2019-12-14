module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'People',
      [
        {
          name: 'John Doe',
          isBetaMember: false,
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('People', null, {});
  },
};
