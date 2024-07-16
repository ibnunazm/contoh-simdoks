import express from 'express';
import {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    searchTask,
    filterByYears,
} from '../controllers/TaskController.js'; 
import { verifyToken } from '../middlewares/VerifyToken.js';

const router = express.Router();

router.get('/tasks', verifyToken, getTasks);
router.get('/task/:id', verifyToken, getTaskById);
router.post('/task', verifyToken, createTask);
router.patch('/task/:id', verifyToken, updateTask);
router.delete('/task/:id', verifyToken, deleteTask);
router.get('/tasks/search', verifyToken, searchTask);
router.get('/tasks/filter', verifyToken, filterByYears);

export default router;