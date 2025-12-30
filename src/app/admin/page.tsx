"use client";

import { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Utensils,
  Trash2,
  Search,
  LogOut,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import type { RSVP } from "@/types";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [filteredRsvps, setFilteredRsvps] = useState<RSVP[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "attending" | "declined">("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Filter RSVPs when filter or search changes
  useEffect(() => {
    let filtered = rsvps;

    if (filter === "attending") {
      filtered = filtered.filter((r) => r.attending);
    } else if (filter === "declined") {
      filtered = filtered.filter((r) => !r.attending);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.email.toLowerCase().includes(query)
      );
    }

    setFilteredRsvps(filtered);
  }, [rsvps, filter, searchQuery]);

  async function checkAuth() {
    try {
      const response = await fetch("/api/admin/auth");
      if (response.ok) {
        setIsAuthenticated(true);
        fetchRsvps();
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setPassword("");
        fetchRsvps();
      } else {
        setAuthError("Invalid password");
      }
    } catch (error) {
      setAuthError("Authentication failed");
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      setIsAuthenticated(false);
      setRsvps([]);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  async function fetchRsvps() {
    try {
      const response = await fetch("/api/admin/rsvps");
      if (response.ok) {
        const data = await response.json();
        setRsvps(data.rsvps || []);
      }
    } catch (error) {
      toast.error("Failed to fetch RSVPs");
    }
  }

  async function handleDelete() {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/rsvps?id=${deleteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setRsvps(rsvps.filter((r) => r.id !== deleteId));
        toast.success("RSVP deleted");
      } else {
        toast.error("Failed to delete RSVP");
      }
    } catch (error) {
      toast.error("Failed to delete RSVP");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  }

  // Stats
  const totalRsvps = rsvps.length;
  const attendingCount = rsvps.filter((r) => r.attending).length;
  const declinedCount = rsvps.filter((r) => !r.attending).length;
  const totalGuests = rsvps
    .filter((r) => r.attending)
    .reduce((sum, r) => sum + (r.guest_count || 1), 0);

  // Meal counts
  const mealCounts = rsvps
    .filter((r) => r.attending && r.meal_preference)
    .reduce((acc, r) => {
      const meal = r.meal_preference!;
      acc[meal] = (acc[meal] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wedding-bg">
        <Loader2 className="h-8 w-8 animate-spin text-wedding-amber" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-wedding-bg p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
                {authError && (
                  <p className="text-red-500 text-sm mt-2">{authError}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-wedding-amber hover:bg-wedding-amber/90"
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wedding-bg pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif text-wedding-black">
            RSVP Dashboard
          </h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-wedding-shade">
                Total RSVPs
              </CardTitle>
              <Users className="h-4 w-4 text-wedding-amber" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRsvps}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-wedding-shade">
                Attending
              </CardTitle>
              <UserCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {attendingCount}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-wedding-shade">
                Declined
              </CardTitle>
              <UserX className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {declinedCount}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-wedding-shade">
                Total Guests
              </CardTitle>
              <Utensils className="h-4 w-4 text-wedding-amber" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalGuests}</div>
            </CardContent>
          </Card>
        </div>

        {/* Meal breakdown */}
        {Object.keys(mealCounts).length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Meal Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {Object.entries(mealCounts).map(([meal, count]) => (
                  <div key={meal} className="flex items-center gap-2">
                    <Badge variant="secondary" className="capitalize">
                      {meal}
                    </Badge>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-wedding-shade" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-wedding-amber" : ""}
            >
              All
            </Button>
            <Button
              variant={filter === "attending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("attending")}
              className={filter === "attending" ? "bg-green-600" : ""}
            >
              Attending
            </Button>
            <Button
              variant={filter === "declined" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("declined")}
              className={filter === "declined" ? "bg-red-600" : ""}
            >
              Declined
            </Button>
          </div>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Meal</TableHead>
                  <TableHead>Dietary</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRsvps.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      <p className="text-wedding-shade">No RSVPs found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRsvps.map((rsvp) => (
                    <TableRow key={rsvp.id}>
                      <TableCell className="font-medium">{rsvp.name}</TableCell>
                      <TableCell>{rsvp.email}</TableCell>
                      <TableCell>
                        {rsvp.attending ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            Attending
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                            Declined
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{rsvp.attending ? rsvp.guest_count : "-"}</TableCell>
                      <TableCell className="capitalize">
                        {rsvp.meal_preference || "-"}
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        {rsvp.dietary_restrictions || "-"}
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        {rsvp.special_requests || "-"}
                      </TableCell>
                      <TableCell className="text-wedding-shade text-sm">
                        {new Date(rsvp.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(rsvp.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Delete confirmation dialog */}
        <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete RSVP</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this RSVP? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Delete"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
