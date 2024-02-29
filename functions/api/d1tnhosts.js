  async function fetchData() {
    const stmt = DB.prepare('SELECT * FROM Hosts LIMIT 3');
    
    // Fetch the first row
   // const firstRow = await stmt.first();
   // console.log(firstRow);
    
    // Fetch all rows and metadata
    const allRows = await stmt.all();
    console.log(allRows.body);
    return allRows.body;
  };