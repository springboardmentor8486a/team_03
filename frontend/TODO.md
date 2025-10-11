# TODO for UrbanAlive Frontend Enhancements

## ViewDetails.jsx Redesign (Completed)
- [x] Add top tabs: Status, Progress, Updates with state management.
- [x] Status tab: Main details, description, photos grid (as in previous), tags, location/time.
- [x] Progress tab: Dynamic step-by-step progress indicator based on complaint.status (purple for active, gray for pending).
- [x] Updates tab: Comments list and add form with local state (mock comments, add new on submit).
- [x] Right sidebar in Status: Assignee details, priority badge, voting button (local increment).
- [x] Quick actions at bottom: Update, Comment, View Work Progress (admin check).
- [x] Ensure photos section in Status tab as requested.

## WorkProgressDashboard.jsx Modifications (Completed)
- [x] Add Axios import and useEffect to fetch complaints from /api/complaints (with auth token).
- [x] Fallback to mock data if API fails.
- [x] Display clickable complaint cards (title, status badge, location); select updates details.
- [x] Dynamic complaint details: Title, description, photos grid, assigned/dept.
- [x] Dynamic timeline/progress steps per selected complaint (similar to ViewDetails).
- [x] Integrate LocationMap component (use mock coords if no lat/lng in data).
- [x] Functional comments: Form with POST to /api/complaints/:id/comments (fallback local add), display list.
- [x] Quick actions: Update Status, Assign Team, Contact Reporter.
- [x] Loading state and admin role check.

## Followup/Testing
- [ ] Test ViewDetails: Launch browser, navigate to /view-details (handle no state), verify tabs switch, progress based on mock status, voting increments, comments add.
- [ ] Test WorkProgress: Admin login, fetch complaints (or mock), select card, verify details/timeline/map/comments.
- [ ] Backend integration: If comments endpoint missing, add to complaintRoutes/controller (future task).
- [ ] Edge cases: No complaints, no photos, invalid status.

## Next Steps
- Integrate real API for votes/comments in ViewDetails (similar to WorkProgress).
- Add search/filter in WorkProgress for complaints.
- Error handling/UI improvements (e.g., empty states).
