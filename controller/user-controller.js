const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");


module.exports.register= async (req,res)=>{
    const { name,email,password} = req.body;
try {
    
    if(!name || !email || !password){
        return res.json({
            success:false,
            message:"please fill all fields"
        });
    }
    const checkUserName = await User.findOne({name})

    if(checkUserName){
        return res.json({
            success:false,
            message:"Name already exist "
        });
    }
    const checkEmail = await User.findOne({email})

    if(checkEmail){
        return res.json({
            success:false,
            message:"Email already exist "
        });
    }
     const hashPassword = await bcrypt.hash(password,12);

     const user = await new User({
        name,
        email,
        password:hashPassword
     })
     await user.save().then(()=>console.log("User Signup successfully"))
     .catch((err)=>console.log(err))

     const token = jwt.sign(
        {
          id: user._id,
       
          email: user.email,
          name: user.name,
        },
        "CLIENT_SECRET_KEY",
        { expiresIn: "5d" }
      );

      res.cookie("token", token, { httpOnly: false, secure: false }).json({
        success: true,
        message: "Logged in successfully",
        users: {
          email: user.email,
        token:token,
          id: user._id,
          name: user.name,
        },
      });
} catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
     
}



module.exports.login= async (req,res)=>{
    const { email,password} = req.body;
try {
    
    if( !email || !password){
        return res.json({
            success:false,
            message:"please fill all fields"
        });
    }
  
    const checkEmail = await User.findOne({email})

    if(!checkEmail){
        return res.json({
            success:false,
            message:"User Did'nt exist "
        });
    }
     const checkPassword = await bcrypt.compare(password,checkEmail.password);

    
if(checkPassword){
     const token = jwt.sign(
        {
          id: checkEmail._id,
       
          email: checkEmail.email,
          name: checkEmail.name,
        },
        "CLIENT_SECRET_KEY",
        { expiresIn: "5d" }
      );

      res.cookie("token", token, { httpOnly: false, secure: false }).json({
        success: true,
        message: "Logged in successfully",
        users: {
          email: checkEmail.email,
        token:token,
          id: checkEmail._id,
          name: checkEmail.name,
        },
      });
    }else{
        res.json({
            success: false,
            message: "password did not match",
          });   
    }
} catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
     
}

module.exports.logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};
