var csvReader = require('./models/csvReader.js');

csvReader.getCourseData(function(courseData){

		// res.send('index');
		for (var i = 0; i < courseData.length; i++){
			
    		var sql = `INSERT INTO Course (year, term, code, title,
                capacity, enrollment, credits,
                mon, tue, wed, thu, fri, sat,
               instructorLast, instructorFirst,
                startDate, endDate, building, room)
               VALUES (?, ? , ?, ?, ?, ?, ?, ?, ?,
               ?,?,?,?,?,?,?,?,?,?)`;

    		var inserts = [courseData[i].year, courseData[i].term, 
              courseData[i].code, courseData[i].title, 
              courseData[i].capacity, courseData[i].enrollment, 
              courseData[i].credits, courseData[i].mon, 
              courseData[i].tue, courseData[i].wed, 
              courseData[i].thu, courseData[i].fri, 
              courseData[i].sat, courseData[i].instructorLast, 
              courseData[i].instructorFirst, courseData[i].startDate, 
              courseData[i].endDate, courseData[i].building, 
              courseData[i].room];

    		sql = mysql.format(sql, inserts);

		    db.query(sql, function(err, result, fields){
		    	console.log(err);
		    });
		}
	});