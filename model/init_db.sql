DROP TABLE IF EXISTS books;

CREATE TABLE `Books` (
	`bookid` int NOT NULL AUTO_INCREMENT,
	`addedby` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`authors` varchar(255) NOT NULL,
	`imgurl` varchar(255),
	`genre` varchar(255),
	`summary` varchar(255),
	`bookcondition` varchar(255),
	PRIMARY KEY (`bookid`)
);

ALTER TABLE `Books` ADD CONSTRAINT `Books_fk0` FOREIGN KEY (`addedby`) REFERENCES `Users`(`userid`);

INSERT INTO Books (addedby, title, authors, imgurl, genre, summary, bookcondition) VALUES 
(1, "Red-Handed", "Peter Schweizer", "https://storage.googleapis.com/du-prd/books/images/9780063061149.jpg", "Politics", "The author of “Profiles in Corruption” portrays a conspiracy of how the Chinese government might infiltrate American institutions.", "Excellent used condition"),
(1, "The Nineties", "Chuck Klosterman", "https://storage.googleapis.com/du-prd/books/images/9780735217959.jpg", "History", "An overview of the cultural and historical impact of the 1990s.", "Brand new"),
(1, "The Body Keeps the Score", "Bessel Ven der Kolk", "https://storage.googleapis.com/du-prd/books/images/9780670785933.jpg", "Mental Health", "How trauma affects the body and mind, and innovative treatments for recovery.", "Some wear and tear"),
(1, "The 1619 Project", "Nikole Hannah-Jones, Caitlin Roper, Ilena Silverman and Jake Silverstein (Eds)", "https://storage.googleapis.com/du-prd/books/images/9780593230572.jpg", "History", "Viewing Americas entanglement with slavery and its legacy, in essays adapted and expanded from The New York Times Magazine.", "Some wear and tear"),
(1, "Educated", "Tara Westover", "https://storage.googleapis.com/du-prd/books/images/9780399590504.jpg", "Memoir", "The daughter of survivalists, who is kept out of school, educates herself enough to leave home for university.", "Brand new"),
(2, "Abandoned in Death", "JD Robb", "https://storage.googleapis.com/du-prd/books/images/9781250278210.jpg", "Thriller", "The 54th book of the In Death series. Eve Dallas investigates a homicide and the disappearance of other women who resemble that victim.", "Excellent used condition"),
(2, "It Ends With Us", "Colleen Hoover", "https://storage.googleapis.com/du-prd/books/images/9781501110375.jpg", "Romance", "A battered wife raised in a violent home attempts to halt the cycle of abuse.", "Brand new"),
(2, "City of the Dead", "Jonathan Kellerman", "https://storage.googleapis.com/du-prd/books/images/9780525618584.jpg", "Thriller", "The 37th book in the Alex Delaware series. Delaware and Sturgis investigate a double homicide.", "Excellent used condition"),
(2, "Verity", "Colleen Hoover", "https://storage.googleapis.com/du-prd/books/images/9781791392796.jpg", "Thriller", "Lowen Ashleigh is hired by the husband of an injured writer to complete her popular series and uncovers a horrifying truth.", "Brand new"),
(2, "The Seven Husbands of Evelyn Hugo", "Taylor Jenkins Reid", "https://storage.googleapis.com/du-prd/books/images/9781501161933.jpg", "Historical Fiction", "A movie icon recounts stories of her loves and career to a struggling magazine writer.", "Excellent used condition");

