import {isAdminByHeader} from '../../../strategies/checkAdmin.js';

const exportTasks = async (req, res) => {
    if (isAdminByHeader(req.headers.authorization)) {
        res.download('./db/db.json');
    } else {
        res.json({success: false, message: 'Not authorization'});
    }
};

export default exportTasks;
