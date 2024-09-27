const express =  require('express');
const router =  express.Router();
const {userSignup , userLogin} =  require('../controller/login.controller');
const { ListofCandidate, voteForCandidate,} =  require('../controller/vote.controllere');
const { authMiddleware, isAdmin } =  require('../middleware/auth');
const {NewCandidate,getCandidate , updateCandidateData, DeleteCandidate} =  require('../controller/candidate.controller');
const {userData , changePassword } =  require('../controller/userProfile');


router.post('/signup'  , userSignup );
router.post('/Login' , userLogin );
router.get('/candidate' , authMiddleware , ListofCandidate);
router.post('/vote/:candidateId',  authMiddleware ,  voteForCandidate);
router.post('/NewCandidate' ,authMiddleware ,  isAdmin , NewCandidate);
router.get('/getuserData' , authMiddleware ,  userData);
router.put('/changePassword' , authMiddleware , changePassword);
router.put('/updatecandidate/:id' , authMiddleware , isAdmin , updateCandidateData);
router.delete("/candidate/del" , authMiddleware , isAdmin , DeleteCandidate);
module.exports = router;