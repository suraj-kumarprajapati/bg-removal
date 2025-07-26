import { Webhook } from "svix";
import userModel from "../models/userModel.js";
import connectDB from "../configs/dbConnect.js";

// controller function to manage webhooks for clerk users
// /api/user/webhooks
const clerkWebhooks = async (req, res) => {
  try {
    await connectDB();  // makes sure that db is connected in advance

    // create a new svix instance with clerk secret
    const wbhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await wbhook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-signature": req.headers["svix-signature"],
      "svix-timestamp": req.headers["svix-timestamp"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name,
        };

        // save the user data to the database
        const createdUser = await userModel.create(userData);
        res.status(201).json({
          success: true,
          message: "User created successfully",
          user: createdUser,
        });

        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
          firstName: data.first_name,
          lastName: data.last_name,
        };

        // update the user in the database
        const updatedUser = await userModel.findOneAndUpdate(
          { clerkId: data.id },
          userData,
          {new : true}
        );
        res.status(200).json({
          success: true,
          message: "User updated successfully",
          user: updatedUser,
        });

        break;
      }

      case "user.deleted": {
        // delete user from the database
        const deletedUser = await userModel.findOneAndDelete({
          clerkId: data.id,
        });

        res.status(200).json({
          success: true,
          message: "User deleted successfully",
          user: deletedUser,
        });

        break;
      }

      default:
        res.status(200).json({
          success: true,
          message: `Unhandled webhook event type: ${type}`,
        });
        break;
    }
  } catch (error) {
    console.log("Webhook Error:", error.message);
    res.status(400).json({
      success: false,
      message: "Webhook handling failed: " + error.message,
    });
  }
};

export { clerkWebhooks };
