/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    year: {
      type: 'INTEGER',
      notNull: true,
    },
    performer: {
      type: 'TEXT',
      notNull: true,
    },
    genre: {
      type: 'TEXT',
      notNull: true,
    },
    duration: {
      type: 'INTEGER',
    },
    albumid: {
      type: 'VARCHAR(50)',
    },
  }, {
    constraints: {
      foreignKeys: {
        references: 'album(id)',
        columns: 'albumid',
        onDelete: 'CASCADE',
      },
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('songs');
};
