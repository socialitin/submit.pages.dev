  async function fetchData() {
    const stmt = db.prepare('SELECT * FROM Hosts LIMIT 3');
    
    // Fetch the first row
   // const firstRow = await stmt.first();
   // console.log(firstRow);
    
    // Fetch all rows and metadata
    const allRows = await stmt.all();
    console.log(allRows);
    return allRows;
  };