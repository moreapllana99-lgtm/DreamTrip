"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import Modal from "@/components/ui/Modal";
import { useStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export default function TripsPage() {
  const { trips, deleteTrip, updateTrip } = useStore();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Trips</h1>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Manage your saved and planned trips</p>
            </div>
            <Link href="/planner">
              <Button>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                New Trip
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {trips.length === 0 ? (
          <EmptyState
            icon="🗺️"
            title="No trips yet"
            description="Start planning your first adventure! Your AI-generated itineraries will appear here."
            action={<Link href="/planner"><Button>Plan Your First Trip</Button></Link>}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <Card key={trip.id} hover className="overflow-hidden p-0">
                <div className="h-40 bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                  <span className="text-5xl">🗺️</span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{trip.destination || "Untitled Trip"}</h3>
                    <Badge variant={trip.status === "planned" ? "info" : "success"}>{trip.status}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Created {formatDate(trip.createdAt)}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                    <Button size="sm" variant="outline" className="flex-1">Share</Button>
                    <button onClick={() => setDeleteId(trip.id)} className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Trip">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete this trip? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="danger" onClick={() => { if (deleteId) { deleteTrip(deleteId); setDeleteId(null); } }}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
