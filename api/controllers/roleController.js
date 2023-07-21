const RoleModel = require("../models/Role");

const createRole = async (req, res) => {
    const { name, detail } = req.body;
    const existingRole = await RoleModel.findOne({ name });
    if (existingRole) {
        return res.status(409).json({ error: "Role already exists." });
    }
    const role = await RoleModel.create({ name, detail });
    res.status(201).json(role);
};


const getAllRoles = async (req, res) => {
    const roles = await RoleModel.find();
    res.json(roles);
};

const getRoleById = async (req, res) => {
    const roleId = req.params.id;
    const role = await RoleModel.findById(roleId);
    if (!role) {
        return res.status(404).json({ error: "Role not found." });
    }
    res.json(role);
};

const updateRoleById = async (req, res) => {
    const roleId = req.params.id;
    const { name, detail } = req.body;
    const role = await RoleModel.findByIdAndUpdate(
        roleId,
        { name, detail },
        { new: true }
    );
    if (!role) {
        return res.status(404).json({ error: "Role not found." });
    }
    res.json(role);
};


const deleteRoleById = async (req, res) => {
    const roleId = req.params.id;
    const role = await RoleModel.findByIdAndDelete(roleId);
    if (!role) {
        return res.status(404).json({ error: "Role not found." });
    }
    res.json({ message: "Role deleted successfully." });
};

const findRoleByName = async (req, res) => {
    const roleName = req.params.name;
    const role = await RoleModel.findOne({ name: roleName });
    if (!role) {
        return res.status(404).json({ error: "Role not found." });
    }
    res.json(role);
};


const _createRole = async ({ name, detail }) => {
    try {
        const existingRole = await RoleModel.findOne({ name });
        if (existingRole) {
            return;
        }
        await RoleModel.create({ name, detail });
    } catch (e) {
    }
}

const createInitialRoles = async () => {
    await _createRole({ name: "USER", detail: "user" });
    await _createRole({ name: "ADMIN", detail: "admin" });
}

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRoleById,
    deleteRoleById,
    findRoleByName,
    createInitialRoles
};
