//Allows you to encapsulate data and behaviour 
//Typescript adds static type checking

// 1 creating a class 
//class ClassName {}....use PascalCase for names
// class StudentMarks {
//     //properties and methods
//     name: string;
//     marks: number[];
// }

//at this point typescript will throw errors as name and marks are not initialized
//we need to add a constructor

interface StdMarkType {
    name: string;
    marks: number[];
}

class StudentMarks {
    //properties and methods
    name: string;
    marks: number[];

    //constructor is  a special method that runs  when a new instance of the class is created
    constructor(/*studObj: StdMarkType*/) {

        //initialize the properties
        // this.name = studObj.name
        // this.marks = studObj.marks

        //we can also do it like this
        this.name = "rae",
            this.marks = [12, 30, 23]
    }
}

//new Instance of a class
const stdData = {
    name: "rae",
    marks: [12, 30, 23]
}

//Instantiating -- do this if you did not define the values inside the constructor
// const stdMarks = new StudentMarks(stdData)
// console.log(stdMarks);

//also in instantiating -- do this if you have defined the values inside the constructor
const LoopMarks = new StudentMarks();
console.log(LoopMarks) //StudentMarks { name: 'rae', marks: [ 12, 30, 23 ] }

//A constructor can also be made flexibleby allowing it to accept arguments
//Second option is to create an interface for your properties

//4. Class Properties
//Default values(property initializer)
//You can set default values for properties directly in the class body

// class Album {
//     title = "My G"
//     artist = "The G"
//     releaseYear = 0;
// }

//these properties can be overriden in the constructor

//readonly properties -- make an object immutable after its set
// class Album {
//     readonly title = "My G"
//     readonly artist = "The G"
//     readonly releaseYear = 0;
// }

//You can also add optional properties
//use the ? syntax
class Album {
    title?: string
    artist?: string
    releaseYear?: string
}

//visibility modifiers
//public, private and protected

class Album1 {
    public title?: string // accessible from anywhere
    private artist?: string // only accessible within the class e.g jwt token
    protected releaseYear?: string //// only accessible within the class and its subsclasses e.g jwt token


}


//6 methods are functions defined within a class

class StudentMarks1 {
    // define properties
    name: string;
    marks: number[];

    //create constructor
    constructor(studObj: StdMarkType) {

        //initialize the properties
        this.name = studObj.name
        this.marks = studObj.marks
    }

    //create methods
    public printInfo() {
        console.log(this.name)
    }
}

const student = new StudentMarks1({
    name: "The G",
    marks: [1, 2, 3, 4]
})

student.printInfo() //The G


// class SpecialMarksStudent extends StudentMarks1 {
//     bonusTracks:  string[];

//     constructor(opts : {name:string, marks: string[]}) {
//         super(opts)
//         this.bonusTracks = opts.bonusTracks
//     }
// }


// Abstract Classes....cannot be instantiated directly. They are meant to be extended by other classes
// all properties must be abstract classes
abstract class AlbumBase {
    title: string;
    artist: string;
    releaseYear: number;
    trackList: string[] = [];

    constructor(opts: { title: string; artist: string; releaseYear: number }) {
        this.title = opts.title;
        this.artist = opts.artist;
        this.releaseYear = opts.releaseYear;
    }

    addTrack(track: string) {
        this.trackList.push(track);
    }
}

class NewAlbum extends AlbumBase {

}

const albumBase = new NewAlbum({
    title: "Unknown Album",
    artist: "Unknown Artist",
    releaseYear: 0,
});



//9. Getters and Setters...allow you to access private modifiers


//10 implements keyword
//The class adheres to a specific structure defined by an interface using implements keyword

//How do you achieve polymorphism...using implements keyword







