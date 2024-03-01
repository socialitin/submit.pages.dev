  export async function onRequest(context) {
    // Create a prepared statement with our query
    //const ps =  context.env.DB.prepare(hosts SET pitching = json_replace(pitching, '$.City[#]', 'US2-EasternCali') WHERE City = 'US2-Eastern');
    //const ps =  context.env.db.prepare("UPDATE hosts SET pitching = json_replace(pitching, '$.City', 'Cali') WHERE '$.City' = 'US2-Eastern'")
    //?1 WHERE City = ?2").bind('US2-Eastern', 'US2-Eastern2'));
    ///UPDATE hosts SET pitching = json_replace(pitching, '$.City', 'Cali') WHERE '$.City' = 'US2-Eastern'
    const ps = context.env.DB.prepare('SELECT * from hosts');
    //json_extract('{ps}', '$.City');
    const data = await ps.first();
  
    return Responsejson(ps);
  }
 
