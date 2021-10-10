const router = require("express").Router();
const follow_model = require("../Models/follow.model");
const {user_model}=require('../Models/user.model')

router.get('/followed/:_id', async (req,res)=>{
    try {
        const {_id}=req.params;
        const fetchFollowers=await user_model.find({_id})
        let msg=!fetchFollowers[0].followers.length ? 'no followers' : fetchFollowers.followers
        return res.status(201).json({
            error:false,
            msg,
            followers:fetchFollowers[0].followers
         
        })
    } catch (error) {
        return res.status(500).json({
            error:true, 
            msg:'Couldnt fetch followers',
            error
        })
    }
})


router.put("/toggleFollow/:_id/:followerId", async (req, res) => {
    try {
      const { _id , followerId} = req.params;
      // const { followerId } = req.body;
      const user= await user_model.findOne({ _id });
      const checkIfYouFollowedUser = user.followers;
      if (checkIfYouFollowedUser.includes(followerId)) {
        const toggleFollow = await user_model.findOneAndUpdate(
          { _id },
          {
            $pull: {
                followers: followerId,
            },
          },
          { new: true, returnNewDocument: true }
        );
      
        return res.status(201).json({
          err: false,
          msg: "UnFollowed ",
          toggleFollow,
        });
      } else {
        const toggleFollow = await user_model.findOneAndUpdate(
          { _id },
          {
            $push: {
              followers: followerId,
            },
          },
          { new: true, returnNewDocument: true }
        );
     
        return res.status(201).json({
          err: false,
          msg: "Followed ",
          toggleFollow,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: true,
        msg: "Couldnt activate follow toggle.",
        error,
      });
    }
  });


router.put("/toggleFollow/:_id", async (req, res) => {
    try {
      const { _id } = req.params;
      const { followerId } = req.body;
      const user= await user_model.findOne({ _id });
      const checkIfYouFollowedUser = user.followers;
      if (checkIfYouFollowedUser.includes(followerId)) {
        const toggleFollow = await user_model.findOneAndUpdate(
          { _id },
          {
            $pull: {
                followers: followerId,
            },
          },
          { new: true, returnNewDocument: true }
        );
      
        return res.status(201).json({
          err: false,
          msg: "UnFollowed ",
          toggleFollow,
        });
      } else {
        const toggleFollow = await user_model.findOneAndUpdate(
          { _id },
          {
            $push: {
              followers: followerId,
            },
          },
          { new: true, returnNewDocument: true }
        );
     
        return res.status(201).json({
          err: false,
          msg: "Followed ",
          toggleFollow,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: true,
        msg: "Couldnt activate follow toggle.",
        error,
      });
    }
  });
// router.put("/toggleFollow/:_id/:followerId", async (req, res) => {
//     try {
//       const { _id , followerId} = req.params;
//       // const { followerId } = req.body;
//       const user= await user_model.findOne({ _id });
//       const checkIfYouFollowedUser = user.followers;
//       if (checkIfYouFollowedUser.includes(followerId)) {
//         const toggleFollow = await user_model.findOneAndUpdate(
//           { _id },
//           {
//             $pull: {
//                 followers: followerId,
//             },
//           },
//           { new: true, returnNewDocument: true }
//         );
      
//         return res.status(201).json({
//           err: false,
//           msg: "UnFollowed ",
//           toggleFollow,
//         });
//       } else {
//         const toggleFollow = await user_model.findOneAndUpdate(
//           { _id },
//           {
//             $push: {
//               followers: followerId,
//             },
//           },
//           { new: true, returnNewDocument: true }
//         );
     
//         return res.status(201).json({
//           err: false,
//           msg: "Followed ",
//           toggleFollow,
//         });
//       }
//     } catch (error) {
//       return res.status(500).json({
//         error: true,
//         msg: "Couldnt activate follow toggle.",
//         error,
//       });
//     }
//   });



module.exports = router;
