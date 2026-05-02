
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from pymongo import MongoClient
from django.conf import settings

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Connect to MongoDB
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Create Teams
        teams = [
            {'name': 'Marvel', 'members': []},
            {'name': 'DC', 'members': []},
        ]
        db.teams.insert_many(teams)

        # Create Users
        users = [
            {'name': 'Spider-Man', 'email': 'spiderman@marvel.com', 'team': 'Marvel'},
            {'name': 'Iron Man', 'email': 'ironman@marvel.com', 'team': 'Marvel'},
            {'name': 'Wonder Woman', 'email': 'wonderwoman@dc.com', 'team': 'DC'},
            {'name': 'Batman', 'email': 'batman@dc.com', 'team': 'DC'},
        ]
        db.users.insert_many(users)
        for user in users:
            if not User.objects.filter(email=user['email']).exists():
                User.objects.create_user(username=user['email'], email=user['email'], password='password', first_name=user['name'])

        # Create Activities
        activities = [
            {'user': 'spiderman@marvel.com', 'activity': 'Running', 'duration': 30},
            {'user': 'ironman@marvel.com', 'activity': 'Cycling', 'duration': 45},
            {'user': 'wonderwoman@dc.com', 'activity': 'Swimming', 'duration': 60},
            {'user': 'batman@dc.com', 'activity': 'Yoga', 'duration': 40},
        ]
        db.activities.insert_many(activities)

        # Create Workouts
        workouts = [
            {'name': 'Full Body', 'difficulty': 'Medium'},
            {'name': 'Cardio Blast', 'difficulty': 'Hard'},
        ]
        db.workouts.insert_many(workouts)

        # Create Leaderboard
        leaderboard = [
            {'user': 'spiderman@marvel.com', 'points': 100},
            {'user': 'ironman@marvel.com', 'points': 90},
            {'user': 'wonderwoman@dc.com', 'points': 110},
            {'user': 'batman@dc.com', 'points': 95},
        ]
        db.leaderboard.insert_many(leaderboard)

        # Create unique index on email for users
        db.users.create_index([('email', 1)], unique=True)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
