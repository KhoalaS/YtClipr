CREATE TABLE channels(id TEXT PRIMARY KEY, profile_picture TEXT, channel_name TEXT);
CREATE TABLE streams(
    id TEXT PRIMARY KEY,
    duration INTEGER,
    published INTEGER,
    thumbnail TEXT,
    title TEXT,
    views INTEGER,
    channelId TEXT,
    CONSTRAINT channelid FOREIGN KEY(channelId) REFERENCES channels(id) ON DELETE CASCADE
);
CREATE TABLE chats(
    id TEXT,
    data BLOB,
    CONSTRAINT fk_chatid FOREIGN KEY(id) REFERENCES streams(id) ON DELETE CASCADE
);
CREATE TABLE superchats(
    id TEXT,
    data BLOB,
    CONSTRAINT fk_superchatid FOREIGN KEY(id) REFERENCES streams(id) ON DELETE CASCADE
);
CREATE TABLE gifts(
    id TEXT,
    data BLOB,
    CONSTRAINT fk_giftid FOREIGN KEY(id) REFERENCES streams(id) ON DELETE CASCADE
);