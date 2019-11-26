module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'minasbike',
  database: 'estoqueminasbike',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
