import sqlite3 from 'sqlite3';
import * as fsExtra from 'fs-extra'
import fs from 'fs'
export const getAllProducts = () => {
  var db = new sqlite3.Database('Campus_Trade.db');

  // Define the SQL query to retrieve all rows from the table
  const query = 'SELECT * FROM products';
  // Execute the SQL query and retrieve all rows as an object
  return new Promise((resolve, reject) => {
    db.all(query, [], function (err, rows) {
      if (err) {
        reject(err)
      } else {
        resolve(rows);
      }
    });
    // Close the database connection
    db.close();
  });

}
export const AddFormData=({name,type,description,age,price,photo})=>{
  var db = new sqlite3.Database('Campus_Trade.db');
  // Save the uploaded photo to the database
  db.run('INSERT INTO products (name, type,description,age,price,img_type,img_content) VALUES (?, ?, ?, ?,?,?,?)', [name,type,description,age,price,photo.mimetype,fs.readFileSync(photo.path)], (err) => {
    if (err) {
      console.error(err);
    } else {

        /*For uploading file,we need to first convert it to savable form,for which we have to save it in 
        a local file (.ie uploads) folder but later we don't need to save the photo twice(1 in mysql other in uploads folder), thatswhy 
        here we are removing the contents of the folder
        */
        fsExtra.emptyDirSync('uploads/');
        console.log("Data Entered in Database")
    }
  });
}
