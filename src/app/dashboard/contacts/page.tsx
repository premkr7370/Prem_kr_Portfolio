"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MessageSquare, Mail, Clock, CheckCircle, Circle } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  replied: boolean;
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);

  useEffect(() => {
    fetch("/api/contacts").then(r => r.json()).then(d => { setContacts(d); setLoading(false); });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark-text flex items-center gap-2">
          <MessageSquare className="text-primary" size={24} /> Contact Messages
        </h1>
        <p className="text-dark-text-secondary text-sm mt-1">{contacts.length} total messages</p>
      </div>

      {loading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-24 rounded-2xl" />)}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Message List */}
          <div className="lg:col-span-1 space-y-3">
            {contacts.map((c, i) => (
              <motion.button key={c.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(c)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selected?.id === c.id ? "bg-primary/10 border-primary/30" : "bg-dark-card border-dark-border hover:border-primary/20"
                }`}>
                <div className="flex items-center gap-2 mb-1">
                  {!c.read ? <Circle size={8} className="text-primary fill-primary" /> : <CheckCircle size={12} className="text-success" />}
                  <span className="text-sm font-medium text-dark-text truncate">{c.name}</span>
                </div>
                <p className="text-xs text-dark-text-secondary truncate">{c.message}</p>
                <p className="text-[10px] text-dark-text-muted mt-1 flex items-center gap-1">
                  <Clock size={10} />
                  {new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </motion.button>
            ))}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <motion.div key={selected.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-dark-card border border-dark-border">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-dark-border">
                  <div>
                    <h3 className="font-semibold text-dark-text">{selected.name}</h3>
                    <p className="text-sm text-dark-text-secondary flex items-center gap-1">
                      <Mail size={12} /> {selected.email}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`text-xs px-2 py-1 rounded-md ${selected.read ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>
                      {selected.read ? "Read" : "Unread"}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-md ${selected.replied ? "bg-primary/10 text-primary" : "bg-dark-text-muted/10 text-dark-text-muted"}`}>
                      {selected.replied ? "Replied" : "No Reply"}
                    </span>
                  </div>
                </div>
                <p className="text-dark-text-secondary leading-relaxed mb-6">{selected.message}</p>
                <p className="text-xs text-dark-text-muted">
                  Received: {new Date(selected.createdAt).toLocaleString()}
                </p>
                <button className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-sm">
                  <Mail size={14} /> Reply via Email
                </button>
              </motion.div>
            ) : (
              <div className="p-12 rounded-2xl bg-dark-card border border-dark-border text-center">
                <MessageSquare size={48} className="text-dark-text-muted mx-auto mb-4 opacity-30" />
                <p className="text-dark-text-muted">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
