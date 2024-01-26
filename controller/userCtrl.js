const userModel = require('../database/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//login
const loginController = async(req,res) =>
{
     try
     {
       const user = await userModel.findOne({email:req.body.email});
       if(!user)
       {
        return res.status(200).send(
            {
                success:false,
                message:'user not found',
            })
       }

       const isMatch = await bcrypt.compare(req.body.password,user.password);
       if(!isMatch)
       {
        return res.status(200).send(
            {
                success:false,
                message:'Invalid email or password',
            })
       }

    
       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '1d' });

       console.log('Generated Token:', token);
        res.status(200).send(
            {
                message:'Login Success',
                success:true,
                token
            })
     }
     catch(error)
     {
        console.log(error);
        res.status(500).send(
            {
                success : false,
                message :  `Login Controller ${error.message}`
            }
        )
     }
};


//register
const RegisterController = async(req,res) =>{

    console.log("Register Control called");

    try
    {
       const existingUser = await userModel.findOne({email:req.body.email});

       if(existingUser)
       {
        return res.status(200).send(
            {
                message : 'User Already Exist',
                success : false
            }
        )
       };
    
    // Hashing password
      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password,salt);
      req.body.password = hashedPassword;

     //new user
     const newUser = new userModel(req.body);
     await newUser.save();
     res.status(201).send(
        {
           message : `Register Successully` ,
           success : true
        }
     )
    }
    catch(error)
    {
       console.log(error);
       res.status(500).send(
           {
               success : false,
               message :  `Register Controller ${error.message}`
           }
       )
    }
};

// user info controller 

const authController = async (req, res) => {
  try {

    const user = await userModel.findOne({ _id: req.body.userId });

    if (!user) {
      console.log(`User with userId ${req.body.userId} not found`);
    }

    res.status(200).send({
      success: true,
      message: 'user data fetch success',
      data: user,
    });
  } catch (error) {
    console.error('Error in authController:', error);

    res.status(500).send({
      success: false,
      message: 'Error fetching user details',
      error,
    });
  }
};



// userProfile controller

const userUpdateProfile = async (req, res) => {
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.body.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).send({
        success: false,
        message: 'User not found for update',
      });
    }

    res.status(201).send({
      success: true,
      message: 'User Profile Updated',
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'User profile update issue',
      error: error.message, 
    });
  }
};

module.exports = userUpdateProfile;

  

module.exports = {loginController, RegisterController, userUpdateProfile, authController};