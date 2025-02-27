import React, { useState, useEffect } from "react";
import { getRules, createRule, updateRule, deleteRule } from "../api";

const RuleManager = () => {
  const [rules, setRules] = useState([]);  // Ensure rules is initialized as an array
  const [newRule, setNewRule] = useState({ name: "", pattern: "", description: "", createdBy: "" });

  // Fetch rules on component mount
  useEffect(() => {
    fetchRules();
  }, []);

  // Fetch rules from API with error handling
  const fetchRules = async () => {
    try {
      const response = await getRules();
      if (response?.data) {
        setRules(response.data);
      } else {
        setRules([]); // Ensure it's an array
      }
    } catch (error) {
      console.error("Error fetching rules:", error);
      setRules([]); // Prevents undefined errors
    }
  };

  // Create new rule
  const handleCreate = async () => {
    if (!newRule.name || !newRule.pattern || !newRule.description || !newRule.createdBy) {
      return alert("Please fill in all fields.");
    }

    try {
      await createRule(newRule);
      setNewRule({ name: "", pattern: "", description: "", createdBy: "" }); // Reset form
      fetchRules(); // Refresh rules list
    } catch (error) {
      console.error("Error creating rule:", error);
    }
  };

  // Update rule
  const handleUpdate = async (id) => {
    const name = prompt("Enter new name:");
    const pattern = prompt("Enter new pattern:");
    const description = prompt("Enter new description:");
    const createdBy = prompt("Enter new creator:");
    if (name && pattern && description && createdBy) {
      try {
        await updateRule(id, { name, pattern, description, createdBy });
        fetchRules();
      } catch (error) {
        console.error("Error updating rule:", error);
      }
    }
  };

  // Delete rule
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this rule?")) {
      try {
        await deleteRule(id);
        fetchRules();
      } catch (error) {
        console.error("Error deleting rule:", error);
      }
    }
  };

  return (
    <div>
      <h2>DLP Rule Management</h2>
      <input
        type="text"
        placeholder="Rule Name"
        value={newRule.name}
        onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Regex Pattern"
        value={newRule.pattern}
        onChange={(e) => setNewRule({ ...newRule, pattern: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newRule.description}
        onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Created By"
        value={newRule.createdBy}
        onChange={(e) => setNewRule({ ...newRule, createdBy: e.target.value })}
      />
      <button onClick={handleCreate}>Add Rule</button>

      <ul>
        {rules?.map((rule) => (
          <li key={rule._id}>
            {rule.name} - {rule.pattern} - {rule.description} - Created by: {rule.createdBy}
            <button onClick={() => handleUpdate(rule._id)}>Edit</button>
            <button onClick={() => handleDelete(rule._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RuleManager;
