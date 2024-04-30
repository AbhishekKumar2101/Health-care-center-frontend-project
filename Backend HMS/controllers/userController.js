
const User=require('../models/User')
const jwt=require('jsonwebtoken')

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        console.log("user in",user)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }

    } catch (error) {
    console.log(error);
    }
}

exports.registerUser = async (req, res,next) => {
    // get user details fron frontend
    // validation - not empty
    // check if user already exists: by username and email
    // check for images 
    // check for avatar
    // upload them to cloudinary, avatar 
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    try {
        const { fullname, email, dateOfBirth,age,gender,address,phone,password } = req.body;
        console.log(req.body)
       
        const existedUser = await User.findOne({
            $or: [{ email }]
        })
    
        if (existedUser) {

            res.status(201).json({message:"User already exist"})
        }
    
        const user = await User.create({
            fullname,
            email,
            dateOfBirth,
            age,
            gender,
            address,
            phone,
            password
        })
    
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );
    
        if (!createdUser) {
            throw new Error("Something went wrong while registering user")
        }
    
        res.status(200).json(
            {
                message:"user registered successfully"
            }
        )
    } catch (error) {
        next(error)
    }

};

exports.loginUser = async (req, res,next) => {

    try {
        const { email, password } = req.body;
        console.log(req.body)
        if (!email) {
            throw new Error("email is required");
        }
    
        const user = await User.findOne({
            $or: [{ email }]
        })
    
        if (!user) {
            
            res
            .status(201)
            .json(
                {
                    message:"user not registered"
                }
            )
        }
    
        const isPasswordValid = await user.isPasswordCorrect(password);
    
        if (!isPasswordValid) {
            throw new Error("Invalid user credentials")
        }
        console.log(user)
    
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
    
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
    
    
        res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                {
                    message:"user logged in successfully"
                }
            )
    } catch (error) {
        next(error)
    }
}

exports.logoutUser = async (req, res) => {
  try {
      await User.findByIdAndUpdate(req.user._id, {
          $set: {
              refreshToken: undefined
          }
      }, {
          new: true
      }
      )
  
      const options = {
          httpOnly: true,
          secure: true
      }
  
     res.status(200)
          .clearCookie("accessToken", options)
          .clearCookie("refreshToken", options)
          .json({message:"User logged out successfully"});
  } catch (error) {
    next(error)
  }

}

exports.refreshAccessToken = async (req, res,next) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newrefreshToken } = await generateAccessAndRefreshToken(user._id)
       res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newrefreshToken, options)
            .json(
                {
                    message:"Accesstoken refreshed"
                }
            )


    } catch (error) {
        next(error)
    }

}



exports.getCurrentUser = async (req, res,next) => {
   try {
     res.
         status(200)
         .json(new ApiResponse(200, req.user, "current user fetched succesfully"))
   } catch (error) {
    next(err);
   }
}

// const updateAccountDetails = asyncHandler(async (req, res) => {
//     const { name, email } = req.body

//     if (!name || !email) {
//         throw new ApiError(400, "All fields are required")
//     }

//     const user = await User.findByIdAndUpdate(
//         req.user?._id,
//         {
//             $set: {
//                 name,
//                 email: email
//             }
//         },
//         { new: true }
//     ).select("-password")

//     return res
//         .status(200)
//         .json(
//             new ApiResponse(200, user, "Account details updated successfully")
//         )

// })

