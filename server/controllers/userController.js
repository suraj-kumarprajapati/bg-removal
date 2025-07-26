import { Webhook } from "svix"
import userModel from "../models/userModel.js";


// controller function to manage webhooks for clerk users 
// /api/user/webhooks
const clerkWebhooks = async (req, res) => {
    try {
        // create a new svix instance with clerk secret
        const wbhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET );

        await wbhook.verify(JSON.stringify(req.body), {
            "svix-id" : req.headers["svix-id"],
            "svix-signature" : req.headers["svix-signature"],
            "svix-timestamp" : req.headers["svix-timestamp"]
        });

        const {data, type} = req.body;

        switch (type) {
            case "user.created": {

                const userData = {
                    clerkId : data.id,
                    email : data.email_addresses[0].email_address,
                    photo : data.image_url,
                    firstName : data.first_name,
                    lastName : data.last_name,
                }

                // save the user data to the database
                const createdUser = await userModel.create(userData);
                res.status(201).json({

                });

                break;
            }

            case "user.updated": {

                const userData = {
                    email : data.email_addresses[0].email_address,
                    photo : data.image_url,
                    firstName : data.first_name,
                    lastName : data.last_name,
                }

                // update the user in the database
                const updatedUser = await userModel.findOneAndUpdate({clerkId : data.id}, userData);
                res.status(200).json({

                });

                break;
            }

            case "user.deleted": {

                // delete user from the database
                const deletedUser = await userModel.findOneAndDelete({clerkId : data.id});

                res.status(200).json({

                });

                break;
            }
                
               
        
            default:
                break;
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            success : false,
            message : error.message,
        });
    }
}


export {clerkWebhooks }