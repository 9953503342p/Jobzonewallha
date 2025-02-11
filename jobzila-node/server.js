const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const PostCourses = require('./models/courses');
const candidatesignup = require('./models/Candidate');
const Employorsignup = require('./models/Emplyor')
const multer = require('multer');
const fs = require('fs');
const Resume = require('./models/Resume');
const Postjob = require('./models/Postjob')
const Apply = require('./models/apply-job')
const { v4: uuidv4 } = require('uuid');
const port = process.env.PORT || 8080;

const path = require('path');
const app = express();

app.use(cookieParser());

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join('uploads/employee/galleryStorage');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename based on timestamp
  },
});

const fileFilter1 = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];  // Allowed file types
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only image files are allowed'), false);
  }
  cb(null, true);
};

const uploadGallery = multer({
  storage: storage1,
  limits: { fileSize: 5 * 1024 * 1024 },  // Limit file size to 5MB
  fileFilter: fileFilter1,
}).single('gallery'); // Expect file field name as 'gallery'



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads', 'candidate', 'profile')); // Cross-platform path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name with timestamp
  }
});

// File filter to allow only specific image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|bmp/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extName = allowedTypes.test(file.originalname.split('.').pop().toLowerCase());

  if (mimeType && extName) {
    return cb(null, true);  // Accept file
  } else {
    return cb(new Error('Only image files are allowed!'), false);  // Reject file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024
  }
});

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage3 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/candidate/resume');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
})

const upload3 = multer({ storage: storage3 });

// Set up multer storage
const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/employee/customevideo');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload2 = multer({ storage: storage2 });

const corsOptions = {
  origin: ["https://jobzonewallha-react1.onrender.com"], // Add your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,             // Allow credentials (cookies, headers, etc.)
};

app.use(cors(corsOptions));

// Set up body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up session management
app.use(session({
  secret: 'your_secret_key', // Use a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to `true` if using HTTPS
}));

app.use('/uploads', express.static('uploads'));

const upload1 = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === 'companylogo') {
        cb(null, 'uploads/employee/companyLogoStorage');
      } else if (file.fieldname === 'backgroundbannerlogo') {
        cb(null, 'uploads/employee/bannerLogoStorage');
      }
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB in bytes
  },
  fileFilter: (req, file, cb) => {
    // Optional: You can restrict file types here (e.g., only .jpg, .png, .jpeg)
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only .jpg, .jpeg, and .png files are allowed'));
    }
  },
});

const url = 'mongodb+srv://py5150954:kmTmw0WWTR0sMR6e@cluster0.bfelm.mongodb.net/'

mongoose.connect(url)
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));


app.post('/candidate-signup', async (req, res) => {
  const { Username, Password, Email, Phone } = req.body;

  // Log the incoming request body to check if fields are received
  console.log(req.body);

  if (!Username || !Password || !Email || !Phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await candidatesignup.findOne({ Username, Email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email and Username already registered.' });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = new candidatesignup({
      Username,
      Email,
      Phone,
      Password: hashedPassword,
    });

    await newUser.save();

    // Setting the userId cookie after successful signup
    res.cookie('candidateId', newUser._id, { maxAge: 3600000, httpOnly: true });

    // Returning the user ID in the response
    res.status(201).json({ message: 'User created successfully', _id: newUser._id });
    console.log(newUser._id)
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server ' });
  }
});

app.post('/employer-signup', async (req, res) => {
  const { username, password, email, phone } = req.body;



  if (!username || !password || !email || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await Employorsignup.findOne({ username, email });
    if (existingUser) {
      return res.status(409).json({ message: ' user already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Employorsignup({
      username,
      email,
      phone,
      password: hashedPassword,
    });


    res.cookie('employeeid', newUser._id, { maxAge: 3600000, httpOnly: true });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', id: newUser._id });
  } catch (err) {
    console.log(err)

    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/candidate-login', async (req, res) => {
  const { Username, Password } = req.body;

  if (!Username || !Password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Search for the user in the candidate collection
    const user = await candidatesignup.findOne({ Username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(Password, user.Password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.cookie("candidateId", user._id, {
      maxAge: 3600000, // 1 hour
      httpOnly: true,
      secure: false,  // Use `true` only in production
      sameSite: "lax", // Adjust based on requirements
    });
    console.log(user._id)

    res.status(200).json({ message: 'Login successful', _id: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/employer-login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Find user in the database
    const user = await Employorsignup.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    // Store user session
    res.cookie('employeeid', user._id, { maxAge: 3600000, httpOnly: true });

    return res.status(200).json({ message: 'Login successful.', id: user._id });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
});



const validator = require('validator'); // for email validation
const { connected } = require('process');


app.post('/update-candidate-info', async (req, res) => {
  const { Name, Email, Password, Website, Qualification, Language, Jobcategory, Experience, Currentsalery, Expectedsalery, Age, Country, City, Postcode, Fulladdress, Description } = req.body;
  const userId = req.cookies.candidateId;
  console.log(userId);

  if (!userId) {
    return res.status(400).json({ message: 'User is not logged in.' });
  }

  try {
    const user = await candidatesignup.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the new email already exists in the database (excluding the current user)
    if (Email && Email !== user.Email) {
      const emailExists = await candidatesignup.findOne({ Email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email is already in use by another user.' });
      }
    }



    // Validate email if provided
    if (Email && !validator.isEmail(Email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Update user information
    user.Name = Name || user.Name;
    user.Email = Email || user.Email;

    // Update password if provided
    if (Password) {
      const hashedPassword = await bcrypt.hash(Password, 10);  // Hash password before saving
      user.Password = hashedPassword;
    }

    user.Website = Website || user.Website;
    user.Qualification = Qualification || user.Qualification;
    user.Language = Language || user.Language;
    user.Jobcategory = Jobcategory || user.Jobcategory;
    user.Experience = Experience || user.Experience;
    user.Currentsalery = Currentsalery || user.Currentsalery;
    user.Expectedsalery = Expectedsalery || user.Expectedsalery;
    user.Age = Age || user.Age;
    user.Country = Country || user.Country;
    user.City = City || user.City;
    user.Postcode = Postcode || user.Postcode;
    user.Fulladdress = Fulladdress || user.Fulladdress;
    user.Description = Description || user.Description;

    // Save the updated user data
    await user.save();

    res.status(200).json({ message: 'User information updated successfully.' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/update-employor-info', upload1.fields([{ name: 'companylogo', maxCount: 1 }, { name: 'backgroundbannerlogo', maxCount: 1 }]), async (req, res) => {
  try {
    const userId = req.cookies.employeeid;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated.' });
    }

    const {
      companyName, phone, email, Website, Estsince, TeamSize, description, about, Address
    } = req.body;

    const companyLogoPath = req.files['companylogo'] ? req.files['companylogo'][0].path : null;
    const backgroundBannerPath = req.files['backgroundbannerlogo'] ? req.files['backgroundbannerlogo'][0].path : null;

    const updateData = {
      companyName,
      phone,
      email,
      Website,
      Estsince,
      TeamSize,
      about,
      Address,
      description,
    };

    if (companyLogoPath) updateData.companylogo = companyLogoPath;
    if (backgroundBannerPath) updateData.backgroundbannerlogo = backgroundBannerPath;

    // Update employer data in your database (assuming MongoDB with Mongoose)
    const updatedEmployer = await Employorsignup.findByIdAndUpdate(userId, { $set: updateData }, { new: true });

    if (!updatedEmployer) {
      return res.status(404).json({ message: 'Employer not found.' });
    }

    res.status(200).json({
      message: 'Employer information updated successfully!',
      employer: updatedEmployer
    });
  } catch (error) {
    console.error('Error updating employer info:', error);
    res.status(500).json({ message: 'Error email is aleady register', error: error.message });
  }
});

app.get('/protected-route', (req, res) => {
  const userId = req.cookies.candidateId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized. Please log in first.' });
  }

  // If userId exists, proceed with the request
  // You can fetch user details from the database using the userId
  candidatesignup.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Send the user data in the response
      res.status(200).json({ message: 'Welcome to the protected route', user });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});


app.post('/update-candidate-profileimage', upload.single('Profileimage'), async (req, res) => {
  const userId = req.cookies.candidateId;
  console.log("Cookies received:", req.cookies);
  console.log("Candidate ID from cookie:", userId);

  if (!userId) {
    return res.status(400).json({ message: 'User is not logged in.' });
  }

  try {
    const user = await candidatesignup.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Use path.join to properly create the file path
    const filePath = path.join('uploads', 'candidate', 'profile', req.file.filename);

    user.Profileimage = filePath;
    await user.save();

    return res.status(200).json({
      message: 'Profile image updated successfully.',
      filePath,
    });
  } catch (err) {
    console.error('Error updating profile image:', err);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message || err });
  }
});

app.get('/get-candidate-profileimage', async (req, res) => {
  const userId = req.cookies.candidateId;
  console.log("Cookies received:", req.cookies);
  console.log("Candidate ID from cookie:", userId);

  if (!userId) {
    return res.status(400).json({ message: 'User is not logged in.' });
  }

  try {
    const user = await candidatesignup.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }



    console.log("Profile image path:", user.Profileimage); // Log the profile image path
    return res.status(200).json({
      Profileimage: user.Profileimage,
    });
  } catch (err) {
    console.error('Error retrieving profile image:', err);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message || err });
  }
});

app.post('/update-password', async (req, res) => {
  const { previousPassword, newPassword, confirmPassword } = req.body;

  // Get userId from the cookie
  const userId = req.cookies.candidateId;
  console.log(userId)
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: No userId in cookies' });
  }

  try {
    // Find the user by userId
    const user = await candidatesignup.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the previous password with the stored hashed password
    const isMatch = await bcrypt.compare(previousPassword, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Previous password is incorrect' });
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New password and confirm password do not match' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password with the hashed new password
    user.Password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
});

app.get('/get-candidate-info', async (req, res) => {
  const userId = req.cookies.candidateId;
  console.log(userId);

  if (!userId) {
    return res.status(400).json({ message: 'User is not logged in.' });
  }

  try {
    const user = await candidatesignup.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Send the user information as response
    res.status(200).json({
      Name: user.Name,
      Email: user.Email,
      Website: user.Website,
      Qualification: user.Qualification,
      Language: user.Language,
      Jobcategory: user.Jobcategory,
      Experience: user.Experience,
      Currentsalery: user.Currentsalery,
      Expectedsalery: user.Expectedsalery,
      Age: user.Age,
      Country: user.Country,
      City: user.City,
      Postcode: user.Postcode,
      Fulladdress: user.Fulladdress,
      Description: user.Description
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.post('/logout', (req, res) => {
  res.clearCookie('userId');  // Clears the userId cookie
  res.status(200).json({ message: 'Logged out successfully' });
});


app.post('/resumeHeadline', async (req, res) => {
  try {
    const userId = req.cookies?.candidateId; // Get userId from cookies
    const { headline, KeySkills, employment } = req.body;
    console.log('User ID:', req.body);  // Debug log

    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    // Validate employment data (if provided)
    if (employment && Array.isArray(employment)) {
      employment.forEach(emp => {
        if (emp.startDate && isNaN(new Date(emp.startDate).getTime())) {
          emp.startDate = null; // Handle invalid startDate
        }
        if (emp.endDate && isNaN(new Date(emp.endDate).getTime())) {

        }
      });
    }

    // Find the user's resume by userId
    let resumeHeadline = await Resume.findOne({ userId });

    if (resumeHeadline) {
      // Update fields if provided
      if (headline) resumeHeadline.headline = headline;
      if (KeySkills && Array.isArray(KeySkills)) resumeHeadline.KeySkills = KeySkills;

      // Append new employment entries
      if (employment && Array.isArray(employment)) {
        resumeHeadline.employment.push(...employment);
      }

      // Save the updated resume
      await resumeHeadline.save();
    } else {
      // If no resume exists, create a new one
      resumeHeadline = new Resume({
        userId,
        headline: headline || '',
        KeySkills: Array.isArray(KeySkills) ? KeySkills : [],
        employment: Array.isArray(employment) ? employment : [],
      });
      await resumeHeadline.save();
    }

    res.status(200).json({
      message: 'Resume updated successfully.',
      data: resumeHeadline,
    });
  } catch (error) {
    console.error('Error updating resume:', error);
    res.status(500).json({
      message: 'Error updating resume headline, skills, or employment details.',
      error: error.message,
    });
  }
});



app.post('/resume-education', async (req, res) => {
  try {
    const userId = req.cookies?.candidateId;
    const { education } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    if (!Array.isArray(education) || education.length === 0) {
      return res.status(400).json({ message: 'Education data is missing or malformed' });
    }

    const validEducation = education.every(edu => {
      return edu.educationCategory && edu.course && edu.university;
    });

    if (!validEducation) {
      return res.status(400).json({ message: 'Education data is invalid or missing required fields.' });
    }

    let resumeHeadline = await Resume.findOne({ userId });

    if (resumeHeadline) {
      resumeHeadline.education.push(...education);
    } else {
      resumeHeadline = new Resume({
        userId,
        education,
      });
    }

    await resumeHeadline.save();

    res.status(200).json({ message: 'Education details saved successfully', data: resumeHeadline });
  } catch (error) {
    console.error('Error saving education details:', error);
    res.status(500).json({ message: 'Error saving education data', error: error.stack || error.message });
  }
});



app.get('/resumeHeadline/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('User ID:', userId);  // Debug log

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Ensure userId is cast to ObjectId (if it's a string)
    const objectId = new mongoose.Types.ObjectId(userId);

    // Find the headline for the user
    const resumeHeadline = await Resume.findOne({ userId: objectId });

    if (!resumeHeadline) {
      return res.status(404).json({ message: 'Resume headline not found' });
    }

    res.status(200).json({ resumeHeadline });
  } catch (error) {
    console.error(error);  // Log the error
    res.status(500).json({ message: 'Error retrieving resume headline' });
  }
});




// POST method to update user data based on userId from cookies
app.post('/update-candidate', async (req, res) => {
  try {
    const userId = req.cookies.candidateId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required in cookies' });
    }

    const { Facebook, Twitter, Linkdin, Whatsapp, Instagram, Pinterest, Tumbir, Youtube } = req.body;

    // Find the candidate by userId
    const candidate = await candidatesignup.findOne({ _id: userId });

    if (!candidate) {
      return res.status(404).json({ message: 'User not found' });
    }

    candidate.Facebook = Facebook || candidate.Facebook;
    candidate.Twitter = Twitter || candidate.Twitter;
    candidate.Linkdin = Linkdin || candidate.Linkdin;
    candidate.Whatsapp = Whatsapp || candidate.Whatsapp;
    candidate.Instagram = Instagram || candidate.Instagram;
    candidate.Pinterest = Pinterest || candidate.Pinterest;
    candidate.Tumbir = Tumbir || candidate.Tumbir;
    candidate.Youtube = Youtube || candidate.Youtube;

    // Save the updated candidate data to the database
    await candidate.save();

    res.status(200).json({ message: 'Candidate information updated successfully', data: candidate });
  } catch (error) {
    console.error('Error updating candidate data:', error);
    res.status(500).json({ message: 'Error updating candidate data', error: error.stack || error.message });
  }
});


app.post('/upload-gallery', uploadGallery, async (req, res) => {
  const employeeId = req.cookies.employeeid;

  if (!employeeId) {
    return res.status(400).json({ message: 'Employee ID not found in cookies' });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const galleryImagePath = req.file.path;
  console.log(galleryImagePath)

  try {
    const updatedEmployee = await Employorsignup.findOneAndUpdate(
      { _id: employeeId },
      { $push: { gallery: galleryImagePath } },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({
      message: 'Gallery image uploaded and saved successfully',
      imagePath: galleryImagePath,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while updating the gallery' });
  }
});

app.post('/post-job', async (req, res) => {
  try {
    // Get employer ID from cookies (assuming it's stored as 'employerId')
    const employerId = req.cookies.employeeid;

    if (!employerId) {
      return res.status(400).json({
        success: false,
        message: 'Employer ID is missing in cookies. Please log in first.'
      });
    }

    // Destructure job data from the request body
    const {
      jobtitle,
      jobcategory,
      jobtype,
      offeredsalary,
      experience,
      qualification,
      gender,
      country,
      city,
      location,
      latitude,
      longitude,
      email,
      website,
      estsince,
      completeaddress,
      description,
      Requirements, // Added missing fields
      Responsibilities, // Added missing fields
      startDate,
      endDate,
      Vacnices, // Fixed typo
      question // Array of questions
    } = req.body;

    // Validate the questions array
    if (!Array.isArray(question)) {
      return res.status(400).json({
        success: false,
        message: 'Questions must be an array'
      });
    }

    // Create a new job post
    const newJob = new Postjob({
      userId: employerId,
      jobtitle,
      jobcategory,
      jobtype,
      offeredsalary,
      experience,
      qualification,
      gender,
      country,
      city,
      location,
      latitude,
      longitude,
      email,
      website,
      estsince,
      completeaddress,
      description,
      Requirements,
      Responsibilities,
      startDate,
      endDate,
      Vacnices, // Fixed typo
      question // Store the questions array with options and correct answer
    });

    // Save the job post to the database
    await newJob.save();

    // Send response back to the client
    res.status(201).json({
      success: true,
      message: 'Job listing created successfully',
      job: newJob
    });
  } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).json({
      success: false,
      message: 'Error posting job, please try again later.'
    });
  }
});




app.post('/update-employer-socialmedia', async (req, res) => {
  const { socialLinks } = req.body;  // This should be the object containing social media links

  // Get userId from cookies
  const userId = req.cookies.employeeid;

  if (!userId || !socialLinks) {
    return res.status(400).json({ message: 'User ID and social media links are required' });
  }

  try {
    // Find the user by userId and update their social media links
    const updatedUser = await Employorsignup.findByIdAndUpdate(
      { _id: userId },  // Find the user by userId
      { $set: { socialLinks } },  // Update the socialLinks field
      { new: true }  // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Social media links updated successfully',
      socialLinks: updatedUser.socialLinks,  // Return the updated socialLinks
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while updating social media links' });
  }
});



app.post('/update-employer-videogallery', upload2.single('customVideo'), async (req, res) => {
  try {
    // Check if the user has a cookie with a specific ID (you can replace this with your logic)
    const userIdFromCookie = req.cookies.employeeid || 'default_user';

    // Find the user by employeeid in the EmployeeSignup collection
    const user = await Employorsignup.findOne({ _id: userIdFromCookie });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    // Handle the form data and file upload
    const youtubeLinks = req.body.youtubeLinks
    const vimeoLinks = req.body.vimeoLinks
    const customVideo = req.file ? req.file.path : null;

    const videoGalleryData = {
      youtubeLinks,
      vimeoLinks,
      customVideo
    }



    user.videoGalleryData = videoGalleryData;


    // Save to the database
    await user.save();

    // Send response with the saved data
    res.json({ message: 'Video gallery updated successfully', customVideo });
  } catch (error) {
    console.error('Error saving video gallery:', error);
    res.status(500).json({ message: 'An error occurred while updating the video gallery' });
  }
});

app.get('/candidate', async (req, res) => {
  try {
    // Fetch all candidates from the database
    const candidates = await candidatesignup.find();
    res.json(candidates); // Send the fetched data as JSON
  } catch (err) {
    res.status(500).json({ error: 'Error fetching candidates data' });
  }
});

app.get('/post-job', async (req, res) => {
  try {
    const { jobtype, offersalary, location, datePosted } = req.query;
    const filter = {jobtype: 'Full Time' };

    // Add filters dynamically
    if (jobtype) filter.jobtype = jobtype;
    if (offersalary) filter.offeredsalary = { $gte: parseFloat(offersalary) };

    // Handle location filter (search in multiple fields)
    if (location) {
      filter.$or = [
        { city: { $regex: new RegExp(location, 'i') } },
        { state: { $regex: new RegExp(location, 'i') } },
        { country: { $regex: new RegExp(location, 'i') } },
        { address: { $regex: new RegExp(location, 'i') } },
      ];
    }

    // Handle datePosted filter
    if (datePosted) {
      const now = new Date();
      let startDate;

      switch (datePosted) {
        case 'last 24 hours':
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case 'last 7 days':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'last 30 days':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = null;
      }

      if (startDate) filter.startDate = { $gte: startDate.toISOString() };
    }

    const jobs = await Postjob.find(filter)
      .populate('userId', 'companylogo companyName Estsince TeamSize description');

    // Add fallback for missing company logo
    const jobsWithFallback = jobs.map(job => ({
      ...job._doc,
      userId: {
        ...job.userId?._doc,
        companylogo: job.userId?.companylogo || 'default-logo.png',
      },
    }));

    res.status(200).json(jobsWithFallback);
  } catch (err) {
    console.error('Error fetching jobs with filters:', err);
    res.status(500).json({ error: 'Error fetching job data' });
  }
});

app.get('/get-internships', async (req, res) => {
  try {
    const { jobtype, offersalary, location, datePosted } = req.query;
    const filter = { jobtype: 'Internship' }; // Only fetch internships

    // Add filters dynamically
    if (jobtype) filter.jobtype = jobtype;
    if (offersalary) filter.offeredsalary = { $gte: parseFloat(offersalary) };

    // Handle location filter (search in multiple fields)
    if (location) {
      filter.$or = [
        { city: { $regex: new RegExp(location, 'i') } },
        { state: { $regex: new RegExp(location, 'i') } },
        { country: { $regex: new RegExp(location, 'i') } },
        { address: { $regex: new RegExp(location, 'i') } },
      ];
    }

    // Handle datePosted filter
    if (datePosted) {
      const now = new Date();
      let startDate;

      switch (datePosted) {
        case 'last 24 hours':
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case 'last 7 days':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'last 30 days':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = null;
      }

      if (startDate) filter.startDate = { $gte: startDate.toISOString() };
    }

    // Fetch internships from the database based on the filters
    const internships = await Postjob.find(filter)
      .populate('userId', 'companylogo companyName Estsince TeamSize description'); // Populate only required fields

    // Add fallback for missing company logo
    const internshipsWithFallback = internships.map(internship => ({
      ...internship._doc,
      userId: {
        ...internship.userId._doc,
        companylogo: internship.userId.companylogo || 'default-logo.png',
      },
    }));

    res.status(200).json(internshipsWithFallback);
  } catch (err) {
    console.error('Error fetching internships with filters:', err);
    res.status(500).json({ error: 'Error fetching internship job data' });
  }
});


app.get('/jobs/grouped', async (req, res) => {
  try {
    const jobsGrouped = await Postjob.aggregate([
      {
        $group: {
          _id: {
            userId: "$userId",
            jobcategory: "$jobcategory"  // Group by job category as well
          },
          jobs: {
            $push: {
              jobtitle: "$jobtitle",
              jobcategory: "$jobcategory",
              offeredsalary: "$offeredsalary",
              experience: "$experience",
              qualification: "$qualification",
              gender: "$gender",
              country: "$country",
              city: "$city",
              location: "$location",
              latitude: "$latitude",
              longitude: "$longitude",
              email: "$email",
              website: "$website",
              estsince: "$estsince",
              completeaddress: "$completeaddress",
              description: "$description",
              startDate: "$startDate",
              endDate: "$endDate",
              createdAt: "$createdAt",
              updatedAt: "$updatedAt",
              Vacnices: "$Vacnices" // Include Vacnices field
            }
          },
          totalVacancies: { $sum: "$Vacnices" }  // Sum Vacnices for each group
        }
      },
      {
        $project: {
          _id: 0,  // Remove the userId and jobcategory from the final response if needed
          userId: "$_id.userId",
          jobcategory: "$_id.jobcategory",
          jobs: 1,
          totalVacancies: 1
        }
      }
    ]);

    // Return the grouped data as a response
    res.status(200).json(jobsGrouped);
  } catch (error) {
    console.error('Error fetching jobs: ', error);
    res.status(500).json({ message: 'An error occurred while fetching jobs.' });
  }
});



app.get('/employers', async (req, res) => {
  try {
    // Fetch all employer data
    const employers = await Employorsignup.find();

    // Send the data as a response
    res.status(200).json(employers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching employers' });
  }
});

app.get('/post-job/:jobId', async (req, res) => {
  const { jobId } = req.params;
  console.log(jobId)
  try {
    // Fetch the job by its id
    const job = await Postjob.findById({ _id: jobId }) // Use `findById` to fetch a specific job by its ID
      .populate('userId', 'companylogo companyName email gallery username password phone createdAt backgroundbannerlogo Website Estsince TeamSize description videoGalleryData socialLinks');

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Ensure questions is always an array
    const questions = Array.isArray(job.questions) ? job.questions : [];

    // Send the job data as response, including the questions array
    res.status(200).json({
      ...job.toObject(), // Spread the job fields
      questions, // Add the questions as a separate property
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching job data' });
  }
});




app.post('/delete-profile', async (req, res) => {
  try {
    // Get userId from cookies
    const userId = req.cookies.employeeid;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Find and delete the user profile
    const deletedUser = await Employorsignup.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    await Postjob.deleteMany({ userId: userId });

    // Clear the 'employeeid' cookie
    res.clearCookie('employeeid', { path: '/' });

    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/it-skills', async (req, res) => {
  try {
    // Retrieve userId from cookies
    const userId = req.cookies.candidateId;

    // If userId is not in cookies, return an error
    if (!userId) {
      return res.status(400).json({
        message: 'User not authenticated. userId not found in cookies.',
      });
    }

    const { Skills, Version, lastused, Experienceyear, Month } = req.body;

    // Find the user's resume document using the userId from cookies
    const resume = await Resume.findOne({ userId });

    if (!resume) {
      return res.status(404).json({
        message: 'Resume not found for this user',
      });
    }

    // Create a new IT skill object
    const newItSkill = {
      Skills,
      Version,
      lastused,
      Experienceyear,
      Month,
    };

    // Push the new IT skill into the Itskill array
    resume.Itskill.push(newItSkill);

    // Save the updated resume
    await resume.save();

    // Send a success response
    res.status(201).json({
      message: 'IT skill added successfully!',
      data: newItSkill,
    });
  } catch (error) {
    // Handle any errors that occur
    console.error(error);
    res.status(500).json({
      message: 'Server error, unable to add IT skill',
      error: error.message,
    });
  }
});

app.post('/candidate/Add-project', async (req, res) => {
  try {
    const userId = req.cookies.candidateId;

    if (!userId) {
      return res.status(400).json({
        message: 'User not authenticated. userId not found in cookies.',
      });
    }

    const { Projecttitle, Education, Client, Projectstatus, Startworking, endwork, Detailofproject } = req.body;

    const resume = await Resume.findOne({ userId });

    if (!resume) {
      return res.status(404).json({
        message: 'Resume not found for this user',
      });
    }

    const Addproject = {
      Projecttitle,
      Education,
      Client,
      Projectstatus,
      Startworking,
      endwork,
      Detailofproject,
    };

    resume.Addproject.push(Addproject);
    await resume.save();

    res.status(201).json({
      message: 'Project added successfully!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error, unable to add the project.',
      error: error.message,
    });
  }
});

app.post('/candidate/Career', async (req, res) => {
  try {
    const userId = req.cookies.candidateId;

    if (!userId) {
      return res.status(400).json({
        message: 'User not authenticated. userId not found in cookies.',
      });
    }

    const {
      Industry, Department, Role, Jobtype, EmploymentType, PreferredShift,
      AvailabilitytoJoin, DesiredLocation, DesiredIndustry, ExpectedSalary
    } = req.body;
    console.log(req.body);


    // Check if all required fields are provided
    if (!Industry || !Department || !Role || !Jobtype || !ExpectedSalary || !AvailabilitytoJoin || !DesiredLocation || !DesiredIndustry) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const resume = await Resume.findOne({ userId });

    if (!resume) {
      return res.status(404).json({
        message: 'Resume not found for this user',
      });
    }

    // Create Career object with the provided data
    const career = {
      Industry, Department, Role, Jobtype, EmploymentType, PreferredShift,
      AvailabilitytoJoin, DesiredLocation, DesiredIndustry, ExpectedSalary
    };

    console.log(ExpectedSalary.Money)
    // Assign Career to the user's resume and save it
    resume.Career = career;
    await resume.save();

    res.status(201).json({
      message: 'Career details added successfully!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error, unable to add career details.',
      error: error.message,
    });
  }
});






app.get('/can-detail/:resumeId', async (req, res) => {
  try {
    const resumeId = req.params.resumeId;

    // Fetch resume by ID
    const resume = await candidatesignup.findById(resumeId)

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Return the resume data
    res.status(200).json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching resume data' });
  }
});


app.get('/resume/:resumeId', async (req, res) => {
  try {
    const resumeId = req.params.resumeId;

    // Fetch resume by userId (not by _id)
    const resume = await Resume.findOne({ userId: resumeId });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Return the resume data
    res.status(200).json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching resume data' });
  }
});

app.post('/profilesummery', async (req, res) => {
  try {
    const userId = req.cookies.candidateId; // Extract userId from cookies
    const { ProfileSummary } = req.body;

    // Validate input
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    if (!ProfileSummary) {
      return res.status(400).json({ message: 'Profile Summary is required' });
    }

    // Ensure userId is a valid ObjectId
    const validUserId = new mongoose.Types.ObjectId(userId); // Using `new` to instantiate ObjectId

    // Update the ProfileSummary for the given userId
    const updatedResume = await Resume.findOneAndUpdate(
      { userId: validUserId }, // Now using the properly instantiated ObjectId
      { ProfileSummary },
      { new: true, runValidators: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: 'Resume not found for the given User ID' });
    }

    res.status(200).json({ message: 'Profile Summary updated successfully', data: updatedResume });
  } catch (error) {
    console.error('Error updating Profile Summary:', error);
    res.status(500).json({ message: 'An error occurred while updating Profile Summary', error: error.message });
  }
});


app.post('/personal-details', async (req, res) => {
  try {
    // Get userId from cookies
    const userId = req.cookies.candidateId;

    if (!userId) {
      return res.status(400).json({ message: 'User not authenticated.' });
    }

    const { details } = req.body; // Extract the details from the request body

    if (!details) {
      return res.status(400).json({ message: 'Details are required.' });
    }

    console.log('Personal Details:', details);

    // Find the user resume by userId
    const resume = await Resume.findOne({ userId });

    if (!resume) {
      return res.status(404).json({ message: 'User resume not found.' });
    }

    // Check if personal details already exist
    if (resume.PersonalDetail && resume.PersonalDetail.length > 0) {
      return res.status(400).json({ message: 'Personal details for this user already exist.' });
    }

    // Save personal details to the resume
    resume.PersonalDetail = details;

    // Save the updated resume
    const savedResume = await resume.save();

    res.status(201).json({ message: 'Personal details saved successfully.', data: savedResume });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});
const uploadDir = path.join(__dirname, 'uploads', 'candidate', 'resume');

const storage5 = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check if the directory exists, if not, create it
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir); // Use absolute path
  },
  filename: (req, file, cb) => {
    // Specify the file name format (e.g., 'userId_timestamp.extension')
    const fileExtension = path.extname(file.originalname);
    cb(null, `${req.cookies.candidateId}_${Date.now()}${fileExtension}`);
  }
});

// Initialize multer with storage configuration
const upload6 = multer({ storage: storage5 });


app.post('/upload-resume', upload6.fields([{ name: 'resumefile', maxCount: 1 }]), async (req, res) => {
  try {
    const userId = req.cookies.candidateId;

    if (!userId) {
      return res.status(400).json({ message: 'User not authenticated.' });
    }

    // Check if the file exists in req.files
    if (!req.files || !req.files.resumefile) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const resumeFilePath = `uploads/resumes/${req.files.resumefile[0].filename}`; // Use req.files.resumefile[0]
    console.log('Resume File Path:', resumeFilePath);

    // Find the user's resume by userId
    const resume = await Resume.findOne({ userId });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found.' });
    }

    resume.resumefile = resumeFilePath;

    const updatedResume = await resume.save();

    res.status(200).json({ message: 'Resume uploaded successfully.', data: updatedResume });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});





app.post('/logout-employeid', (req, res) => {
  res.clearCookie('employeeid');
  res.status(200).json({ message: 'logout ' });
});
app.post('/logout-candidate', (req, res) => {
  res.clearCookie('candidateId');
  res.status(200).json({ message: 'logout ' });
});




const storage4 = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'resume') {
      cb(null, 'uploads/candidate/resume'); // Save resumes in the 'uploads/candidate/resume' directory
    } else if (file.fieldname === 'video') {
      cb(null, 'uploads/candidate/videoanswer'); // Save videos in the 'uploads/candidate/videoanswer' directory
    } else {
      cb(new Error('Invalid file field'), false);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Prefix the original filename with the current timestamp
  },
});

const upload4 = multer({ storage: storage4 });

// app.post('/apply-job', upload4.fields([{ name: 'resume', maxCount: 1 }, { name: 'video', maxCount: 1 }]), async (req, res) => {
//   const { name, email, message, questionsAndAnswers, JobId, userId } = req.body;

//   // Get the file paths for resume and video if uploaded
//   const resume = req.files?.resume ? req.files.resume[0].path : null;
//   const video = req.files?.video ? req.files.video[0].path : null;

//   try {
//     // Parse the questions and answers from the body
//     const parsedQuestionsAndAnswers = JSON.parse(questionsAndAnswers);

//     // Add logging to check the structure of parsedQuestionsAndAnswers
//     console.log('Parsed Questions and Answers:', parsedQuestionsAndAnswers);

//     // Ensure that each question has at least one of 'answer' or 'video'
//     parsedQuestionsAndAnswers.forEach((item, index) => {
//       // Log each question and check if it has either 'answer' or 'video'
//       console.log(`Question ${index + 1}:`, item);

//       if (!(item.answer || (item.video && typeof item.video === 'string' && item.video.trim() !== ''))) {
//         console.error(`Error: Question ${index + 1} does not have a valid answer or video.`);
//         throw new Error(`Each question must have either an answer or a video. Missing for question ${index + 1}`);
//       }
//     });

//     // Create the new application document
//     const newApplication = new Apply({
//       name,
//       email,
//       message,
//       questionsAndAnswers: parsedQuestionsAndAnswers,
//       JobId,
//       userId,
//       resume,
//       video,  // Store the video file path if uploaded
//     });

//     // Save the application to the database
//     await newApplication.save();

//     res.status(200).json({ message: 'Application submitted successfully!' });
//   } catch (error) {
//     console.error('Error submitting application:', error);
//     res.status(500).json({ error: error.message || 'There was an error submitting your application.' });
//   }
// });

app.post('/apply-job', upload4.fields([{ name: 'resume', maxCount: 1 }, { name: 'video', maxCount: 10 }]), async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Request Files:', req.files); // Log all uploaded files details

  const { name, message, email, phone, JobId, questionsAndAnswers } = req.body;
  const userId = req.cookies.candidateId;

  // Check if user is logged in
  if (!userId) {
    return res.status(401).json({ error: 'User not logged in' });
  }

  // Ensure required fields are provided
  if (!name || !email || !JobId) {
    return res.status(400).json({ error: 'Name, email, and JobId are required' });
  }

  try {
    // Check if the user has already applied for this job
    const existingApplication = await Apply.findOne({ userId, JobId });
    if (existingApplication) {
      return res.status(400).json({ error: 'You have already applied for this job' });
    }


    // Get the resume and video file paths (if uploaded)
    const resumeFilePath = req.files?.resume ? req.files.resume[0].path : null;
    const videoPaths = req.files?.video?.map(file => file.path) || [];

    let parsedQuestionsAndAnswers;
    try {
      parsedQuestionsAndAnswers = JSON.parse(questionsAndAnswers);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid JSON format in questionsAndAnswers.' });
    }

    // Assign video paths to respective questions
    parsedQuestionsAndAnswers.forEach((qa, index) => {
      if (videoPaths[index]) {
        qa.video = { path: videoPaths[index], status: 'uploaded' };
      }
    });

    console.log('Parsed Questions and Answers:', videoPaths); // Debug log

    // Create the new application
    const newApplication = new Apply({
      userId,
      JobId,
      name,
      email,
      phone,
      message,
      questionsAndAnswers: parsedQuestionsAndAnswers,
      resume: resumeFilePath,
      video: videoPaths, // Store the video file path if uploaded
    });

    // Save the new application
    const savedApplication = await newApplication.save();

    // Return success response
    res.status(201).json({
      message: 'Job application submitted successfully',
      application: savedApplication,
    });
  } catch (error) {
    console.error('Error saving job application:', error);

    // Handle duplicate key error (unique constraint violation)
    if (error.code === 11000) {
      return res.status(400).json({ error: 'You have already applied for this job' });
    }

    // Handle general errors
    res.status(500).json({ error: 'video is required' });
  }
});

app.get('/apply-job', async (req, res) => {
  const employerId = req.cookies.employeeid; // Extract employerId from cookies

  if (!employerId) {
    return res.status(400).json({
      success: false,
      message: 'Employer ID is required in cookies. Please log in first.',
    });
  }

  try {
    // Fetch applications and populate JobId and userId
    const applications = await Apply.find()
      .populate({
        path: 'JobId',
        match: { userId: employerId }, // Match JobId.userId with employerId
        select: 'jobtitle jobcategory jobtype offeredsalary location description startDate endDate',
      })
      .populate(
        'userId',
        'Username Email Phone Profileimage Language Age Country City Currentsalery Description Expectedsalery Experience Fulladdress Jobcategory'
      );

    // Filter out applications without a matching JobId
    const filteredApplications = applications.filter((app) => app.JobId);

    if (!filteredApplications || filteredApplications.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No applications found for this employer.',
      });
    }

    // Return the populated and filtered applications
    res.status(200).json({
      success: true,
      applications: filteredApplications,
    });
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching applications.',
      error: err.message,
    });
  }
});



app.get('/apply-candidate-detail/:applyId', async (req, res) => {
  const { applyId } = req.params;  // Destructure directly from req.params

  if (!applyId) {
    return res.status(400).send('Apply ID is required');
  }

  try {
    // Find the application with the specified applyId
    const application = await Apply.findById(applyId)  // Use applyId directly
      .populate({
        path: 'JobId',
        select: 'jobtitle jobcategory jobtype offeredsalary location description startDate endDate',
      })
      .populate(
        'userId',
        'Username Email Phone Profileimage Language Age Country City Currentsalery Description Expectedsalery Experience Fulladdress Jobcategory'
      );

    if (!application) {
      return res.status(404).send('Application not found');
    }

    // Send the application details
    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.get('/applies-job', async (req, res) => {
  const candidateId = req.cookies.candidateId; // Get candidateId from cookies

  if (!candidateId) {
    return res.status(400).send('Candidate ID is required');
  }


  try {
    // Query applications with populated JobId and userId
    const applications = await Apply.find()
      .populate({
        path: 'JobId', // Populate JobId with the relevant job data
        select: 'jobtitle jobcategory jobtype offeredsalary website location description userId startDate endDate',
        populate: {
          path: 'userId', // Populate userId of JobId to get employer details
          model: 'Emp', // Reference the employer schema
          select: 'companylogo' // Include the companylogo field
        }
      })
      .populate({
        path: 'userId', // Populate userId (candidate details)
        match: { _id: candidateId }, // Ensure the userId matches the candidateId from cookies
        select: 'Username Email Phone Profileimage Language Age Country City Currentsalary Description Expectedsalary Experience Fulladdress Jobcategory'
      });

    // Filter out applications where the userId (candidate) matches the candidateId from cookies
    const filteredApplications = applications.filter((app) => app.userId);

    if (filteredApplications.length === 0) {
      return res.status(404).send('No applications found for this candidate');
    }

    // Return the populated and filtered applications
    res.json(filteredApplications);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/emploercandidate', async (req, res) => {
  const employerId = req.cookies.employeeid;

  if (!employerId) {
    console.log('Employee ID not found');
    return res.status(400).json({ error: 'Employee ID is required in cookies' });
  }

  try {
    const employerData = await Employorsignup.findById(employerId);  // Await the result of the query
    if (!employerData) {
      return res.status(404).json({ error: 'Employer not found' });
    }
    res.json(employerData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/candidates', async (req, res) => {
  const employerId = req.cookies.candidateId;

  if (!employerId) {
    console.log('Employee ID not found in cookies');
    return res.status(400).json({ error: 'Employee ID is required in cookies' });
  }

  console.log('Employer ID:', employerId);

  try {
    // Validate if `employerId` is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(employerId)) {
      return res.status(400).json({ error: 'Invalid Employer ID' });
    }

    const employerData = await candidatesignup.findById(employerId);
    if (!employerData) {
      return res.status(404).json({ error: 'Employer not found' });
    }

    console.log('Employer Data:', employerData);
    res.json(employerData);
  } catch (err) {
    console.error('Error fetching employer data:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});


app.get('/vacancies/total', async (req, res) => {
  try {
    // Aggregate to sum up all the vacancies for each employer based on userId
    const totalVacancies = await Postjob.aggregate([
      {
        $group: {
          _id: "$userId", // Group by userId
          totalVacancies: { $sum: { $toInt: "$Vacnices" } }, // Sum Vacnices for each employer (userId)
          completeaddress: { $first: "$completeaddress" }, // Fetch first completeaddress per userId
          country: { $first: "$country" } // Fetch first country per userId
        }
      },
      {
        $lookup: {
          from: "emps", // The name of the collection for employers
          localField: "_id", // The field from Postjob
          foreignField: "_id", // The field from Emp (userId)
          as: "employerDetails" // The new array field where the employer details will be stored
        }
      },
      {
        $unwind: "$employerDetails" // Flatten the array to get a single employer object
      },
      {
        $project: {
          _id: 1,
          totalVacancies: 1,
          completeaddress: 1,
          country: 1,
          "employerDetails.companyName": 1,
          "employerDetails.companylogo": 1,
          "employerDetails.Website": 1
        }
      }
    ]);

    // If no job posts exist, return a 404 error
    if (totalVacancies.length === 0) {
      return res.status(404).json({ message: 'No job posts found' });
    }

    // Return the total number of vacancies for each employer along with additional details
    res.status(200).json({
      vacancies: totalVacancies
    });

  } catch (error) {
    console.error('Error fetching total vacancies:', error);
    // Return a server error response
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/employer-stats', async (req, res) => {
  try {
    const employerId = req.cookies.employeeid; // Get employerId from cookies
    console.log(employerId)
    if (!employerId) {
      return res.status(400).json({ message: 'Employer ID is required' });
    }

    // Validate if the employerId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(employerId)) {
      return res.status(400).json({ message: 'Invalid Employer ID format' });
    }

    // Create ObjectId using the 'new' keyword
    const employerObjectId = new mongoose.Types.ObjectId(employerId);

    // Count total job posts created by the employer
    const totalJobPosts = await Postjob.countDocuments({ userId: employerObjectId });

    // Count total applications for the jobs posted by the employer
    const totalApplications = await Apply.aggregate([
      {
        $lookup: {
          from: 'postes', // Replace 'postes' with the actual collection name for Postjob in the database
          localField: 'JobId',
          foreignField: '_id',
          as: 'jobDetails',
        },
      },
      {
        $match: { 'jobDetails.userId': employerObjectId },
      },
      {
        $count: 'totalApplications',
      },
    ]);

    res.status(200).json({
      employerId,
      totalJobPosts,
      totalApplications: totalApplications[0]?.totalApplications || 0,
    });
  } catch (error) {
    console.error('Error fetching employer stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/employer-last-application', async (req, res) => {
  try {
    const employerId = req.cookies.employeeid; // Get employerId from cookies
    console.log(employerId);

    if (!employerId) {
      return res.status(400).json({ message: 'Employer ID is required' });
    }

    // Validate if the employerId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(employerId)) {
      return res.status(400).json({ message: 'Invalid Employer ID format' });
    }

    // Create ObjectId using the 'new' keyword
    const employerObjectId = new mongoose.Types.ObjectId(employerId);

    // Count total job posts created by the employer
    const totalJobPosts = await Postjob.countDocuments({ userId: employerObjectId });

    // Count total applications for the jobs posted by the employer
    const totalApplications = await Apply.aggregate([
      {
        $lookup: {
          from: 'postes', // Replace 'postes' with the actual collection name for Postjob in the database
          localField: 'JobId',
          foreignField: '_id',
          as: 'jobDetails',
        },
      },
      {
        $match: { 'jobDetails.userId': employerObjectId },
      },
      {
        $count: 'totalApplications',
      },
    ]);

    // Fetch the last 5 applications for the employer
    const lastFiveApplications = await Apply.aggregate([
      {
        $lookup: {
          from: 'postes', // Again, make sure 'postes' matches the correct collection
          localField: 'JobId',
          foreignField: '_id',
          as: 'jobDetails',
        },
      },
      {
        $match: { 'jobDetails.userId': employerObjectId },
      },
      {
        $sort: { createdAt: -1 }, // Sort by createdAt to get the latest first
      },
      {
        $limit: 5, // Limit the results to the last 5 applications
      },
      {
        $lookup: {
          from: 'candidatesignups', // The candidate collection
          localField: 'userId',
          foreignField: '_id',
          as: 'candidateDetails',
        },
      },
      {
        $unwind: '$candidateDetails', // Unwind the candidateDetails array to get individual details
      },
    ]);

    // Format the result to include both the application and the candidate details
    const applicationsWithCandidateDetails = lastFiveApplications.map(application => ({
      application: {
        JobId: application.JobId,
        userId: application.userId,
        message: application.message,
        resume: application.resume,
        createdAt: application.createdAt,
      },
      candidate: {
        name: application.candidateDetails.Name,
        email: application.candidateDetails.Email,
        phone: application.candidateDetails.Phone,
        profileImage: application.candidateDetails.Profileimage,
        Username: application.candidateDetails.Username,
        Website: application.candidateDetails.Website,
        Qualification: application.candidateDetails.Qualification,
        Language: application.candidateDetails.Language,
        Jobcategory: application.candidateDetails.Jobcategory,
        Experience: application.candidateDetails.Experience,
        Currentsalery: application.candidateDetails.Currentsalery,
        Expectedsalery: application.candidateDetails.Expectedsalery,
        Age: application.candidateDetails.Age,
        Country: application.candidateDetails.Country,
        City: application.candidateDetails.City,
        Postcode: application.candidateDetails.Postcode,
        Fulladdress: application.candidateDetails.Fulladdress,
        // Description:application.candidateDetails.Description,
        createdAt: application.candidateDetails.createdAt,
        updatedAt: application.candidateDetails.updatedAt,

      },
    }));

    res.status(200).json({
      employerId,
      totalJobPosts,
      totalApplications: totalApplications[0]?.totalApplications || 0,
      lastFiveApplications: applicationsWithCandidateDetails,
    });
  } catch (error) {
    console.error('Error fetching employer stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/employer-recent-activity', async (req, res) => {
  try {
    const employerId = req.cookies.employeeid; // Get employerId from params
    console.log(employerId);

    if (!employerId) {
      return res.status(400).json({ message: 'Employer ID is required' });
    }

    // Validate if the employerId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(employerId)) {
      return res.status(400).json({ message: 'Invalid Employer ID format' });
    }

    const employerObjectId = new mongoose.Types.ObjectId(employerId);

    // Fetch the last 10 job posts created by the employer
    const last10JobPosts = await Postjob.aggregate([
      {
        $match: { userId: employerObjectId }, // Match employer's job posts
      },
      {
        $sort: { createdAt: -1 }, // Sort by creation date in descending order
      },
      {
        $limit: 10, // Limit to the last 10 job posts
      },
      {
        $lookup: {
          from: 'emps', // Reference to the employer's collection ('Emp' model)
          localField: 'userId', // Match the `userId` field in Postjob with `_id` in Emp
          foreignField: '_id', // Match with the _id field in the 'Emp' collection
          as: 'employerDetails', // Store the employer details in 'employerDetails'
        },
      },
      {
        $unwind: '$employerDetails', // Unwind the employer details array
      },
      {
        $project: {
          jobtitle: 1,
          jobcategory: 1,
          jobtype: 1,
          offeredsalary: 1,
          experience: 1,
          qualification: 1,
          gender: 1,
          country: 1,
          city: 1,
          location: 1,
          latitude: 1,
          longitude: 1,
          email: 1,
          website: 1,
          estsince: 1,
          completeaddress: 1,
          description: 1,
          startDate: 1,
          endDate: 1,
          Vacnices: 1,
          question: 1,
          employerName: '$employerDetails.companyName', // Include companyName from employerDetails
          employerLogo: '$employerDetails.companylogo', // Include company logo
        },
      },
    ]);

    res.status(200).json({
      employerId,
      last10JobPosts, // Include the last 10 job posts
    });
  } catch (error) {
    console.error('Error fetching employer stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



app.get('/user-application-stats', async (req, res) => {
  try {
    const userId = req.cookies.candidateId; // Retrieve userId from cookies

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid User ID format' });
    }

    const objectId = new mongoose.Types.ObjectId(userId);

    // Total applications count
    const totalAppliedApplications = await Apply.countDocuments({ userId: objectId });

    // Total unique jobs count
    const totalAppliedJobs = await Apply.aggregate([
      { $match: { userId: objectId } },
      { $group: { _id: '$JobId' } },
      { $count: 'total' }
    ]);

    // Total unique companies count
    const totalAppliedCompanies = await Apply.aggregate([
      { $match: { userId: objectId } },
      {
        $lookup: {
          from: 'postjobs', // Replace with the actual name of the job collection
          localField: 'JobId',
          foreignField: '_id',
          as: 'jobDetails'
        }
      },
      { $unwind: { path: '$jobDetails', preserveNullAndEmptyArrays: false } },
      { $group: { _id: '$jobDetails.userId' } },
      { $count: 'total' }
    ]);

    // Candidate details
    const candidate = await candidatesignup.findById(objectId);
    if (!candidate) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Response
    res.status(200).json({
      totalAppliedApplications,
      totalAppliedJobs: totalAppliedJobs.length > 0 ? totalAppliedJobs[0].total : 0,
      totalAppliedCompanies: totalAppliedCompanies.length > 0 ? totalAppliedCompanies[0].total : 0,
    });
  } catch (err) {
    console.error('Error fetching application stats:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/user/last-applied-jobs', async (req, res) => {
  const userId = req.cookies.candidateId; // Get userId from the cookie

  if (!userId) {
    return res.status(400).json({ message: 'User ID not found in cookies.' });
  }

  try {
    // Fetch the last 10 applied jobs by the user (applicant)
    const applies = await Apply.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate({
        path: 'JobId', // JobId from Apply schema, which links to Postjob
        select: 'jobtitle jobcategory userId', // Include jobtitle, jobcategory, and userId
        populate: {
          path: 'userId', // Populate userId to fetch employer details (from Employorsignup schema)
          select: 'companyName', // Get the company name of the employer
        },
      });

    const result = applies.map((apply) => ({
      jobId: apply.JobId?._id || null,
      jobTitle: apply.JobId?.jobtitle || 'Unknown',
      jobCategory: apply.JobId?.jobcategory || 'Unknown',
      companyName: apply.JobId?.userId?.companyName || 'Unknown', // Extract company name from employer
      appliedAt: apply.createdAt,
    }));

    res.json(result);
  } catch (error) {
    console.error('Error fetching applied jobs:', error);
    res.status(500).json({ message: 'Unable to fetch applied jobs.' });
  }
});

app.get('/user/last-5appliedccompany-jobs', async (req, res) => {
  const userId = req.cookies.candidateId; // Get userId from the cookie

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid User ID' });
  }

  try {
    // Fetch the last 5 applied jobs by the user (applicant)
    const applies = await Apply.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)  // Limit to the last 5 applied jobs
      .populate({
        path: 'JobId', // JobId from Apply schema, which links to Postjob
        select: 'jobtitle _id jobcategory userId qualification country city location jobtype completeaddress offeredsalary', // Include jobtitle, jobcategory, and userId
        populate: {
          path: 'userId', // Populate userId to fetch employer details (from Employorsignup schema)
          select: 'companyName username email companylogo companyName Website Estsince TeamSize ', // Get the company name of the employer
        },
      });

    const result = applies.map((apply) => ({
      _id: apply._id,
      jobId: apply.JobId?._id || null,
      jobTitle: apply.JobId?.jobtitle || 'Unknown',
      jobCategory: apply.JobId?.jobcategory || 'Unknown',
      companyName: apply.JobId?.userId?.companyName || 'Unknown',
      username: apply.JobId?.userId?.username || 'Unknown',
      email: apply.JobId?.userId?.email || 'Unknown',
      companylogo: apply.JobId?.userId?.companylogo || 'Unknown',
      Website: apply.JobId?.userId?.Website || 'Unknown',
      Estsince: apply.JobId?.userId?.Estsince || 'Unknown',
      TeamSize: apply.JobId?.userId?.TeamSize || 'Unknown',
      qualification: apply.JobId?.qualification || 'Unknown',
      country: apply.JobId?.country || 'Unknown',
      city: apply.JobId?.city || 'Unknown',
      location: apply.JobId?.location || 'Unknown',
      jobtype: apply.JobId?.jobtype || 'Unknown',
      completeaddress: apply.JobId?.completeaddress || 'Unknown',
      offeredsalary: apply.JobId?.offeredsalary || 'Unknown',
      appliedAt: apply.createdAt,
    }));

    res.json(result);
  } catch (error) {
    console.error('Error fetching applied jobs:', error);
    res.status(500).json({ message: 'Unable to fetch applied jobs.' });
  }
});

app.get('/employers/:userId', async (req, res) => {
  const { userId } = req.params;  // Get userId from the URL parameter
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid userId format' });
  }
  try {
    const employer = await Employorsignup.findOne({ _id: userId });  // Find the employer by userId
    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }
    res.status(200).json(employer);  // Send the employer data as response
  } catch (error) {
    console.error('Error fetching employer:', error);
    res.status(500).json({ message: 'Error fetching employer' });
  }
});

app.post('/apply/delete', async (req, res) => {
  const { applyId } = req.body;
  console.log(applyId)
  try {
    const result = await Apply.findByIdAndDelete(applyId);

    if (!result) {
      return res.status(404).json({ message: 'Apply document not found' });
    }

    res.status(200).json({ message: 'Apply document deleted successfully' });
  } catch (error) {
    console.error('Error deleting Apply document:', error);
    res.status(500).json({ message: 'Error deleting Apply document' });
  }
});

app.get('/jobs/last4/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch the last 4 jobs for the given userId
    const jobs = await Postjob.find({ userId })
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .limit(4) // Limit the results to 4
      .populate('userId', 'username companyName companylogo email'); // Populate employer details

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: 'No jobs found for this employer.' });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API to get a resume by userId from cookies
app.get('/api/resumes', async (req, res) => {
  try {
    // Get the userId from cookies
    const userId = req.cookies.candidateId;

    if (!userId) {
      return res.status(400).json({ message: 'User not authenticated.' });
    }

    // Find the resume by userId
    const resume = await Resume.findOne({ userId });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found.' });
    }

    // Return the resume data
    res.status(200).json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ message: 'Error fetching resume.', error: error.message });
  }
});

app.get('/latest-jobs', async (req, res) => {
  try {
    const jobs = await Postjob.find()
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .limit(5) // Limit to the last five jobs
      .populate('userId', 'username email companyName Address companylogo Website'); // Populate userId with specific fields

    res.status(200).json({ success: true, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


app.get('/counts', async (req, res) => {
  try {
    const candidateCount = await candidatesignup.countDocuments();
    const employerCount = await Employorsignup.countDocuments();
    const postjobCount = await Postjob.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        candidates: candidateCount,
        employers: employerCount,
        postjobs: postjobCount
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// app.post('/apply-jobs', upload4.fields([
//   { name: 'resume', maxCount: 1 },
//   { name: 'video', maxCount: 10 } // Multiple video files supported
// ]), async (req, res) => {
//   const { name, message, email, JobId, questionsAndAnswers } = req.body;
//   const userId = req.cookies.candidateId;

//   if (!userId) {
//     return res.status(401).json({ error: 'User not logged in' });
//   }

//   if (!name || !email || !JobId) {
//     return res.status(400).json({ error: 'Name, email, and JobId are required' });
//   }

//   try {
//     const existingApplication = await Apply.findOne({ userId, JobId });
//     if (existingApplication) {
//       return res.status(400).json({ error: 'You have already applied for this job' });
//     }

//     const resumeFilePath = req.files?.resume ? req.files.resume[0].path : null;

//     if (!resumeFilePath && (!req.files?.video || req.files.video.length === 0)) {
//       return res.status(400).json({ error: 'At least one file (resume or video) is required' });
//     }

//     let parsedQuestionsAndAnswers;
//     try {
//       parsedQuestionsAndAnswers = typeof questionsAndAnswers === 'string'
//         ? JSON.parse(questionsAndAnswers)
//         : questionsAndAnswers;
//     } catch (e) {
//       return res.status(400).json({ error: 'Invalid questionsAndAnswers format' });
//     }

//     const videoFiles = req.files?.video || [];
//     parsedQuestionsAndAnswers.forEach((qAndA, index) => {
//       if (videoFiles[index]) {
//         qAndA.video = videoFiles[index].path;  // Video path stored for each answer
//       }
//     });

//     const newApplication = new Apply({
//       userId,
//       JobId,
//       name,
//       email,
//       message,
//       questionsAndAnswers: parsedQuestionsAndAnswers,
//       resume: resumeFilePath,
//     });

//     const savedApplication = await newApplication.save();
//     res.status(201).json({
//       message: 'Job application submitted successfully',
//       application: savedApplication,
//     });
//   } catch (error) {
//     console.error('Error saving job application:', error);
//     if (error.code === 11000) {
//       return res.status(400).json({ error: 'You have already applied for this job' });
//     }
//     res.status(500).json({ error: 'Failed to submit job application' });
//   }
// });

const storage6 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/admin/courses'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
  }
});

const upload7 = multer({ storage:storage6 });

app.post('/post-course', upload7.single('courseimage'), async (req, res) => {
  try {
    // Extract fields from the request body
    const { coursetitle, courseprice, courseduration,coursedescription,courseseat,placementprice } = req.body;

    // Validate required fields
    if (!coursetitle || !courseprice || !courseduration || !coursedescription || !courseseat || !placementprice) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Create a new course document
    const newCourse = new PostCourses({
      coursetitle,
      courseprice,
      courseduration,
      coursedescription,
      courseseat,
      placementprice,
      courseimage: req.file ? req.file.path : null // Save the uploaded file path if available
    });

    // Save the course to the database
    await newCourse.save();

    res.status(201).json({ success: true, message: 'Course posted successfully!', course: newCourse });
  } catch (error) {
    console.error('Error posting course:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

app.get('/get-courses', async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await PostCourses.find();

    // Return the courses in the response
    res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});


app.get('/total-candidates', async (req, res) => {
  try {
    const totalCandidates = await candidatesignup.countDocuments();
    res.status(200).json({ success: true, totalCandidates });
  } catch (error) {
    console.error('Error fetching total candidates:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

app.get('/total-employers', async (req, res) => {
  try {
    const totalEmployers = await Employorsignup.countDocuments();
    res.status(200).json({ success: true, totalEmployers });
  } catch (error) {
    console.error('Error fetching total employers:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

app.get('/total-vacancies', async (req, res) => {
  try {
    const totalVacancies = await Postjob.aggregate([
      {
        $group: {
          _id: null, // No grouping criteria, so we group all documents
          totalVacancies: { $sum: { $toInt: "$Vacnices" } } // Sum the 'Vacnices' field
        }
      }
    ]);

    // Check if we have a result
    const total = totalVacancies.length > 0 ? totalVacancies[0].totalVacancies : 0;

    res.status(200).json({ success: true, totalVacancies: total });
  } catch (error) {
    console.error('Error calculating total vacancies:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

app.get('/api/job-categories', async (req, res) => {
  try {
    const categories = await Postjob.distinct('jobcategory');
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error fetching job categories:', err);
    res.status(500).json({ error: 'Error fetching job categories' });
  }
});

app.get('/api/cities', async (req, res) => {
  try {
    const cities = await Postjob.distinct('city');
    res.status(200).json(cities);
  } catch (err) {
    console.error('Error fetching cities:', err);
    res.status(500).json({ error: 'Error fetching cities' });
  }
});

app.get("/api/employer/jobs", async (req, res) => {
  try {
    // Extract employer ID from cookies
    const employerId = req.cookies.employeeid;

    if (!employerId) {
      return res.status(400).json({ message: "Employer ID is required in cookies." });
    }

    // Fetch employer data
    const employer = await Employorsignup.findById(employerId, "companylogo companyName email phone description Website");
    if (!employer) {
      return res.status(404).json({ message: "Employer not found." });
    }

    // Fetch all jobs posted by the employer
    const jobs = await Postjob.find({ userId: employerId });

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this employer." });
    }

    // Map jobs to include application count
    const jobsWithApplicationCounts = await Promise.all(
      jobs.map(async (job) => {
        const applicationCount = await Apply.countDocuments({ JobId: job._id });
        return {
          jobId: job._id,
          jobtitle: job.jobtitle,
          jobcategory: job.jobcategory,
          jobtype: job.jobtype,
          offeredsalary: job.offeredsalary,
          applications: applicationCount,
          startDate: job.startDate,
          endDate: job.endDate,
          location: job.completeaddress,
        };
      })
    );

    // Return combined data
    res.status(200).json({
      message: "Jobs and employer details fetched successfully.",
      employer: {
        id: employer._id,
        companyName: employer.companyName,
        email: employer.email,
        phone: employer.phone,
        description: employer.description,
        logo: employer.companylogo,
        website: employer.Website,
      },
      jobs: jobsWithApplicationCounts,
    });
  } catch (error) {
    console.error("Error fetching employer and jobs:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

app.delete('/jobs/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;

    // Find and delete the job by ID
    const deletedJob = await Postjob.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully', deletedJob });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'An error occurred while deleting the job' });
  }
});


app.get("/jobs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid job ID" });
    }

    // Find the job by ID
    const job = await Postjob.findById(id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT: Update Job by ID
app.put("/jobs/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid job ID" });
    }

    // Update the job
    const updatedJob = await Postjob.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Validate the data against the schema
    });

    if (!updatedJob) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.put('/apply/:id/approve', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Expecting status: "approved" or "rejected"

  try {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid application ID' });
    }

    // Validate the status
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be "approved" or "rejected".' });
    }

    // Find and update the application
    const updatedApplication = await Apply.findByIdAndUpdate(
      id,
      { approved: status },
      { new: true } // Return the updated document
    );

    if (!updatedApplication) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.status(200).json(updatedApplication);
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/jobs/filter', async (req, res) => {
  try {
      const { jobcategory, offersalary, location, datePosted } = req.query;
      const filter = {};

      // Apply filters only if they are provided
      if (jobcategory) filter.jobcategory = jobcategory;
      if (offersalary) filter.offeredsalary = { $gte: parseFloat(offersalary) };
      if (location) filter.location = { $regex: new RegExp(location, 'i') };

      if (datePosted) {
          const now = new Date();
          let startDate = null;

          switch (datePosted) {
              case 'last 24 hours':
                  startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                  break;
              case 'last 7 days':
                  startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                  break;
              case 'last 30 days':
                  startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                  break;
          }

          if (startDate) filter.startDate = { $gte: startDate.toISOString() };
      }

      // If no filters, return all jobs
      const jobs = await Postjob.find(filter).exec();
      res.status(200).json(jobs || []);
  } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/job/applications/:jobId', async (req, res) => {
  try {
      const { jobId } = req.params;

      // Count the number of applications for the given JobId
      const applicationCount = await Apply.countDocuments({ JobId: jobId });

      // Find the job details including vacancies and start date
      const jobDetails = await Postjob.findById(jobId, 'startDate Vacnices');

      if (!jobDetails) {
          return res.status(404).json({ message: 'Job not found' });
      }

      res.status(200).json({
          jobDetails,
          applicationCount: applicationCount || 0, // If no applications, return 0
      });
  } catch (error) {
      res.status(500).json({ error: 'Server error', details: error.message });
  }
});



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
