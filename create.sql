CREATE TABLE chats(id TEXT PRIMARY KEY, data BLOB);
CREATE TABLE superchats(
    id TEXT,
    data BLOB,
    CONSTRAINT fk_superchatid FOREIGN KEY(id) REFERENCES chats(id) ON DELETE CASCADE
);
CREATE TABLE gifts(
    id TEXT,
    data BLOB,
    CONSTRAINT fk_giftid FOREIGN KEY(id) REFERENCES chats(id) ON DELETE CASCADE
);