export const DB_NAME= "videotube";
/*
Why do we need DB_NAME?

DB_NAME tells MongoDB which specific database inside the cluster to connect to.
The cluster can contain multiple databases, so the database name identifies the one your application will use.
If the specified database doesn't exist, MongoDB automatically creates it when data is first inserted.
*/