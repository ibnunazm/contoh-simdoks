import express from 'express';
import {
    getStaffs,
    getStaffById,
    createStaff,
    updateStaff,
    deleteStaff,
    searchStaff,
    filterByYears,
} from '../controllers/StaffController.js'; 
import { verifyToken } from '../middlewares/VerifyToken.js';

const router = express.Router();

router.get('/Staffs', verifyToken, getStaffs);
router.get('/Staff/:id', verifyToken, getStaffById);
router.post('/Staff', verifyToken, createStaff);
router.patch('/Staff/:id', verifyToken, updateStaff);
router.delete('/Staff/:id', verifyToken, deleteStaff);
router.get('/Staffs/search', verifyToken, searchStaff);
router.get('/Staffs/filter', verifyToken, filterByYears);

export default router;