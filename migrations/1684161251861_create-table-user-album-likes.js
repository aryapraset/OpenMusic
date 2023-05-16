/* eslint-disable camelcase */


exports.up = (pgm) => {
  pgm.createTable('user_album_likes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    album_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  }, {
    constraints: {
      foreignKeys: [
        {
          references: 'users(id)',
          columns: 'user_id',
          onDelete: 'CASCADE',
        },
        {
          references: 'album(id)',
          columns: 'album_id',
          onDelete: 'CASCADE',
        },
      ],
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('user_album_likes');
};
