import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Plus, Phone, Trash2, Star, GripVertical } from "lucide-react";
import SOSButton from "@/components/SOSButton";
import BottomNav from "@/components/BottomNav";

interface Contact {
  id: number;
  name: string;
  phone: string;
  relation: string;
  isPrimary: boolean;
}

const initialContacts: Contact[] = [
  { id: 1, name: "Mom", phone: "+91 98765 43210", relation: "Mother", isPrimary: true },
  { id: 2, name: "Riya", phone: "+91 87654 32109", relation: "Best Friend", isPrimary: false },
  { id: 3, name: "Dad", phone: "+91 76543 21098", relation: "Father", isPrimary: false },
];

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newRelation, setNewRelation] = useState("");

  const addContact = () => {
    if (!newName || !newPhone) return;
    setContacts([
      ...contacts,
      { id: Date.now(), name: newName, phone: newPhone, relation: newRelation, isPrimary: false },
    ]);
    setNewName("");
    setNewPhone("");
    setNewRelation("");
    setShowAdd(false);
  };

  const removeContact = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const togglePrimary = (id: number) => {
    setContacts(contacts.map((c) => ({ ...c, isPrimary: c.id === id ? !c.isPrimary : c.isPrimary })));
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-4 pt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Emergency Contacts</h1>
            <p className="text-muted-foreground text-sm">People who'll be notified in emergencies</p>
          </div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft"
          >
            <Plus className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>

        {/* Add new contact form */}
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-card rounded-2xl p-4 shadow-card mb-4 space-y-3"
          >
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Contact Name"
              className="w-full px-4 py-3 rounded-xl bg-secondary text-secondary-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="tel"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="Phone Number"
              className="w-full px-4 py-3 rounded-xl bg-secondary text-secondary-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              value={newRelation}
              onChange={(e) => setNewRelation(e.target.value)}
              placeholder="Relationship (e.g., Sister)"
              className="w-full px-4 py-3 rounded-xl bg-secondary text-secondary-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={addContact}
              disabled={!newName || !newPhone}
              className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm shadow-soft disabled:opacity-50"
            >
              Add Contact
            </button>
          </motion.div>
        )}

        {/* Info */}
        <div className="bg-primary/5 rounded-2xl p-3 mb-4 flex items-start gap-3">
          <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Tip:</span> Star contacts to set them as priority. They'll be notified first during emergencies.
          </p>
        </div>

        {/* Contacts list */}
        <div className="space-y-2">
          {contacts.map((contact, i) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl p-4 shadow-card flex items-center gap-3"
            >
              <GripVertical className="w-4 h-4 text-muted-foreground/40 shrink-0" />
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary-foreground">{contact.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-card-foreground">{contact.name}</p>
                <p className="text-xs text-muted-foreground">{contact.phone}</p>
                <p className="text-[10px] text-primary font-medium">{contact.relation}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => togglePrimary(contact.id)} className="p-2">
                  <Star
                    className={`w-4 h-4 ${contact.isPrimary ? "text-moderate fill-moderate" : "text-muted-foreground"}`}
                  />
                </button>
                <a href={`tel:${contact.phone}`} className="p-2">
                  <Phone className="w-4 h-4 text-safe" />
                </a>
                <button onClick={() => removeContact(contact.id)} className="p-2">
                  <Trash2 className="w-4 h-4 text-unsafe" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <SOSButton />
      <BottomNav />
    </div>
  );
};

export default EmergencyContacts;
