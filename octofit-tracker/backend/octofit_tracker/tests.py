from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def test_user_creation(self):
        user = User.objects.create(name='Test', email='test@example.com', team='Marvel')
        self.assertEqual(user.name, 'Test')
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.team, 'Marvel')

    def test_team_creation(self):
        team = Team.objects.create(name='TestTeam', members=[])
        self.assertEqual(team.name, 'TestTeam')
        self.assertEqual(team.members, [])

    def test_activity_creation(self):
        activity = Activity.objects.create(user='test@example.com', activity='Running', duration=30)
        self.assertEqual(activity.user, 'test@example.com')
        self.assertEqual(activity.activity, 'Running')
        self.assertEqual(activity.duration, 30)

    def test_workout_creation(self):
        workout = Workout.objects.create(name='TestWorkout', difficulty='Easy')
        self.assertEqual(workout.name, 'TestWorkout')
        self.assertEqual(workout.difficulty, 'Easy')

    def test_leaderboard_creation(self):
        lb = Leaderboard.objects.create(user='test@example.com', points=50)
        self.assertEqual(lb.user, 'test@example.com')
        self.assertEqual(lb.points, 50)
