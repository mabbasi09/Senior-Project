function CourseList(year, term, code, title, capacity, enrollment, credits, 
	mon, tue, wed, thu, fri, sat, instructorLast, instructorFirst, 
	startDate, endDate, building, room){

	this.year = year;
	this.term = term;
	this.code = code;
	this.title = title;
	this.capacity = capacity;
	this.enrollment = enrollment;
	this.credits = credits;
	this.mon = mon;
	this.tue = tue;
	this.wed = wed;
	this.thu = thu;
	this.fri = fri;
	this.sat = sat;
	this.instructorLast = instructorLast;
	this.instructorFirst = instructorFirst;
	this.startDate = startDate;
	this.endDate = endDate;
	this.building = building;
	this.room = room;
}

module.exports = {

	getCourseData: function(cb){

		var fs = require('fs');
		var parse = require('csv-parse');

		var parser = parse(function(err, data){
			var courses = [];

			for (var index = 1; index < data.length; index++){
				courses.push(new CourseList(data[index][0], data[index][1], 
					data[index][2], data[index][3], data[index][4], 
					data[index][5], data[index][6], data[index][7], 
					data[index][8], data[index][9], data[index][10], 
					data[index][11], data[index][12], data[index][13], 
					data[index][14], data[index][15], data[index][16], 
					data[index][17], data[index][18] ));
			}
			cb(courses);
		});
	
		fs.createReadStream('./school/courseData.csv').pipe(parser);
	}

};