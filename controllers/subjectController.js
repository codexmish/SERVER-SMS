const { createSubjectServices } = require("../services/subjectServices")

// ---------create subject
const createSubjectConroller = async(req, res)=>{
    try {
        const result = await createSubjectServices(req.body)
    } catch (error) {
        
    }
}

module.exports = {createSubjectConroller}