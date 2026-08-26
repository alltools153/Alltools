"""
Age Milestone & Cosmic Bio Calculator Service
Provides high-precision chronological age, leap year compensation,
planetary orbital calculations, cosmic biology metrics, and astrology insights.
"""

from datetime import datetime, date, timedelta
from typing import Dict, Any, List, Optional
import math

MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

DAYS_OF_WEEK = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
]

def format_date_str(d: datetime) -> str:
    day_name = DAYS_OF_WEEK[d.weekday()]
    month_name = MONTH_NAMES[d.month - 1]
    return f"{day_name}, {month_name} {d.day}, {d.year}"

def calculate_chronological_age(birth_dt: datetime, target_dt: Optional[datetime] = None) -> Dict[str, Any]:
    if target_dt is None:
        target_dt = datetime.now()

    is_future = target_dt < birth_dt
    older = target_dt if is_future else birth_dt
    newer = birth_dt if is_future else target_dt

    diff_seconds = (newer - older).total_seconds()
    diff_days = (newer.date() - older.date()).days

    # Calculate exact calendar years, months, days
    years = newer.year - older.year
    months = newer.month - older.month
    days = newer.day - older.day

    if days < 0:
        months -= 1
        # Previous month days
        prev_month = newer.month - 1 if newer.month > 1 else 12
        prev_year = newer.year if newer.month > 1 else newer.year - 1
        # Days in previous month
        if prev_month in [1, 3, 5, 7, 8, 10, 12]:
            days_in_prev = 31
        elif prev_month in [4, 6, 9, 11]:
            days_in_prev = 30
        else:
            is_leap = (prev_year % 4 == 0 and prev_year % 100 != 0) or (prev_year % 400 == 0)
            days_in_prev = 29 if is_leap else 28
        days += days_in_prev

    if months < 0:
        years -= 1
        months += 12

    total_months = max(0, years * 12 + months)
    total_weeks = total_days = int(diff_seconds // 86400)
    weeks = total_weeks // 7
    remaining_days_week = total_weeks % 7
    total_hours = int(diff_seconds // 3600)
    total_minutes = int(diff_seconds // 60)
    total_secs = int(diff_seconds)
    decimal_years = round(diff_seconds / (365.2425 * 86400), 5)

    is_leap_baby = (birth_dt.month == 2 and birth_dt.day == 29)
    is_bday_today = (birth_dt.month == target_dt.month and birth_dt.day == target_dt.day)

    return {
        "years": max(0, years),
        "months": max(0, months),
        "days": max(0, days),
        "hours": newer.hour - older.hour if newer.hour >= older.hour else (24 + newer.hour - older.hour),
        "minutes": newer.minute - older.minute if newer.minute >= older.minute else (60 + newer.minute - older.minute),
        "seconds": newer.second - older.second if newer.second >= older.second else (60 + newer.second - older.second),
        "totalDays": total_days,
        "totalWeeks": weeks,
        "remainingDaysInWeek": remaining_days_week,
        "totalMonths": total_months,
        "totalHours": total_hours,
        "totalMinutes": total_minutes,
        "totalSeconds": total_secs,
        "decimalAgeYears": decimal_years,
        "birthDayOfWeek": DAYS_OF_WEEK[birth_dt.weekday()],
        "isLeapYearBaby": is_leap_baby,
        "isBirthdayToday": is_bday_today,
        "birthDateFormatted": format_date_str(birth_dt),
        "targetDateFormatted": format_date_str(target_dt),
    }

def calculate_next_birthday(birth_dt: datetime, now_dt: Optional[datetime] = None) -> Dict[str, Any]:
    if now_dt is None:
        now_dt = datetime.now()

    curr_year = now_dt.year
    b_month = birth_dt.month
    b_day = birth_dt.day

    def get_bday_date(yr: int) -> datetime:
        is_leap = (yr % 4 == 0 and yr % 100 != 0) or (yr % 400 == 0)
        day = 28 if (b_month == 2 and b_day == 29 and not is_leap) else b_day
        return datetime(yr, b_month, day, birth_dt.hour, birth_dt.minute, birth_dt.second)

    next_bday = get_bday_date(curr_year)
    if next_bday <= now_dt:
        next_bday = get_bday_date(curr_year + 1)

    diff = next_bday - now_dt
    total_seconds = max(0, int(diff.total_seconds()))
    days = total_seconds // 86400
    hours = (total_seconds % 86400) // 3600
    minutes = (total_seconds % 3600) // 60
    seconds = total_seconds % 60

    turning_age = next_bday.year - birth_dt.year

    upcoming = []
    for y in range(next_bday.year, next_bday.year + 7):
        d = get_bday_date(y)
        upcoming.append({
            "year": y,
            "date": f"{MONTH_NAMES[d.month - 1][:3]} {d.day}, {y}",
            "dayOfWeek": DAYS_OF_WEEK[d.weekday()],
            "age": y - birth_dt.year
        })

    return {
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds,
        "nextBirthdayDate": next_bday.isoformat(),
        "nextBirthdayDayOfWeek": DAYS_OF_WEEK[next_bday.weekday()],
        "turningAge": turning_age,
        "upcomingBirthdays": upcoming
    }

def calculate_planetary_ages(birth_dt: datetime, now_dt: Optional[datetime] = None) -> List[Dict[str, Any]]:
    if now_dt is None:
        now_dt = datetime.now()

    diff_days = max(0.0, (now_dt - birth_dt).total_seconds() / 86400.0)

    planets = [
        {"planet": "Mercury", "period": 87.97, "color": "amber", "symbol": "☿", "fact": "A year on Mercury is shorter than a single day on Mercury (176 Earth days)."},
        {"planet": "Venus", "period": 224.70, "color": "yellow", "symbol": "♀", "fact": "Venus spins backwards, meaning the Sun rises in the west."},
        {"planet": "Earth", "period": 365.25, "color": "blue", "symbol": "🜨", "fact": "Our home orb orbits the Sun at roughly 67,000 miles per hour."},
        {"planet": "Mars", "period": 686.98, "color": "red", "symbol": "♂", "fact": "Mars has Olympus Mons, the largest volcano in the solar system (3x Everest)."},
        {"planet": "Jupiter", "period": 4332.59, "color": "orange", "symbol": "♃", "fact": "Jupiter is so large that over 1,300 Earths could fit inside."},
        {"planet": "Saturn", "period": 10759.22, "color": "yellow-600", "symbol": "♄", "fact": "Saturn’s rings span 175,000 miles but are only ~30 feet thick."},
        {"planet": "Uranus", "period": 30685.40, "color": "cyan", "symbol": "♅", "fact": "Uranus rotates sideways with a 98-degree axial tilt."},
        {"planet": "Neptune", "period": 60189.00, "color": "indigo", "symbol": "♆", "fact": "Neptune features winds exceeding 1,200 mph (faster than the speed of sound)."},
        {"planet": "Pluto", "period": 90560.00, "color": "slate", "symbol": "♇", "fact": "It takes Pluto 248 Earth years to complete a single revolution around the Sun."}
    ]

    results = []
    for p in planets:
        planet_age = round(diff_days / p["period"], 2)
        next_ordinal = math.floor(diff_days / p["period"]) + 1
        days_to_next = (next_ordinal * p["period"]) - diff_days
        next_bday_date = now_dt + timedelta(days=days_to_next)

        results.append({
            "planet": p["planet"],
            "orbitalPeriodDays": p["period"],
            "ageOnPlanet": planet_age,
            "nextBirthdayEarthDate": next_bday_date.strftime("%b %d, %Y"),
            "daysToNextBirthday": max(0, int(math.ceil(days_to_next))),
            "symbol": p["symbol"],
            "funFact": p["fact"]
        })
    return results

def calculate_cosmic_bio_stats(birth_dt: datetime, now_dt: Optional[datetime] = None) -> Dict[str, Any]:
    if now_dt is None:
        now_dt = datetime.now()

    diff_secs = max(0.0, (now_dt - birth_dt).total_seconds())
    total_minutes = diff_secs / 60.0
    total_hours = diff_secs / 3600.0
    total_days = diff_secs / 86400.0

    heartbeats = int(total_minutes * 80)
    breaths = int(total_minutes * 16)
    awake_minutes = total_minutes * (16.0 / 24.0)
    blinks = int(awake_minutes * 17)
    meals = int(total_days * 3)
    sleep_hours = int(total_days * 8)
    sleep_years = round(sleep_hours / (24.0 * 365.25), 2)
    sun_miles = int(total_hours * 67000)
    sun_km = int(total_hours * 107826)
    galaxy_miles = int(total_hours * 514000)
    galaxy_km = int(total_hours * 828000)
    earth_rotations = int(total_days)

    return {
        "heartbeats": heartbeats,
        "breaths": breaths,
        "blinks": blinks,
        "mealsEaten": meals,
        "sleepHours": sleep_hours,
        "sleepYears": sleep_years,
        "sunDistanceMiles": sun_miles,
        "sunDistanceKm": sun_km,
        "galaxyDistanceMiles": galaxy_miles,
        "galaxyDistanceKm": galaxy_km,
        "earthRotations": earth_rotations
    }

def get_astrological_insights(birth_dt: datetime) -> Dict[str, Any]:
    m = birth_dt.month
    d = birth_dt.day

    # Western Zodiac
    if (m == 3 and d >= 21) or (m == 4 and d <= 19):
        zodiac = {"sign": "Aries", "symbol": "♈", "element": "Fire", "dates": "Mar 21 - Apr 19", "traits": ["Bold", "Energetic", "Pioneering"]}
    elif (m == 4 and d >= 20) or (m == 5 and d <= 20):
        zodiac = {"sign": "Taurus", "symbol": "♉", "element": "Earth", "dates": "Apr 20 - May 20", "traits": ["Reliable", "Patient", "Devoted"]}
    elif (m == 5 and d >= 21) or (m == 6 and d <= 20):
        zodiac = {"sign": "Gemini", "symbol": "♊", "element": "Air", "dates": "May 21 - Jun 20", "traits": ["Adaptable", "Curious", "Eloquent"]}
    elif (m == 6 and d >= 21) or (m == 7 and d <= 22):
        zodiac = {"sign": "Cancer", "symbol": "♋", "element": "Water", "dates": "Jun 21 - Jul 22", "traits": ["Intuitive", "Empathetic", "Loyal"]}
    elif (m == 7 and d >= 23) or (m == 8 and d <= 22):
        zodiac = {"sign": "Leo", "symbol": "♌", "element": "Fire", "dates": "Jul 23 - Aug 22", "traits": ["Charismatic", "Generous", "Leader"]}
    elif (m == 8 and d >= 23) or (m == 9 and d <= 22):
        zodiac = {"sign": "Virgo", "symbol": "♍", "element": "Earth", "dates": "Aug 23 - Sep 22", "traits": ["Analytical", "Meticulous", "Helpful"]}
    elif (m == 9 and d >= 23) or (m == 10 and d <= 22):
        zodiac = {"sign": "Libra", "symbol": "♎", "element": "Air", "dates": "Sep 23 - Oct 22", "traits": ["Diplomatic", "Charming", "Harmonious"]}
    elif (m == 10 and d >= 23) or (m == 11 and d <= 21):
        zodiac = {"sign": "Scorpio", "symbol": "♏", "element": "Water", "dates": "Oct 23 - Nov 21", "traits": ["Passionate", "Brave", "Perceptive"]}
    elif (m == 11 and d >= 22) or (m == 12 and d <= 21):
        zodiac = {"sign": "Sagittarius", "symbol": "♐", "element": "Fire", "dates": "Nov 22 - Dec 21", "traits": ["Optimistic", "Adventurous", "Philosophical"]}
    elif (m == 12 and d >= 22) or (m == 1 and d <= 19):
        zodiac = {"sign": "Capricorn", "symbol": "♑", "element": "Earth", "dates": "Dec 22 - Jan 19", "traits": ["Disciplined", "Strategic", "Tenacious"]}
    elif (m == 1 and d >= 20) or (m == 2 and d <= 18):
        zodiac = {"sign": "Aquarius", "symbol": "♒", "element": "Air", "dates": "Jan 20 - Feb 18", "traits": ["Visionary", "Original", "Humanitarian"]}
    else:
        zodiac = {"sign": "Pisces", "symbol": "♓", "element": "Water", "dates": "Feb 19 - Mar 20", "traits": ["Compassionate", "Artistic", "Gentle"]}

    # Chinese Zodiac
    year = birth_dt.year
    animals = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"]
    animal = animals[(year - 1900) % 12]
    last_digit = year % 10
    element = "Metal" if last_digit in [0, 1] else "Water" if last_digit in [2, 3] else "Wood" if last_digit in [4, 5] else "Fire" if last_digit in [6, 7] else "Earth"
    yin_yang = "Yang" if year % 2 == 0 else "Yin"

    chinese = {
        "animal": animal,
        "element": element,
        "yinYang": yin_yang,
        "lunarYear": year
    }

    # Generation
    if year <= 1945:
        gen = {"name": "Silent Generation", "range": "1928 – 1945", "tagline": "The Traditional Builders"}
    elif year <= 1964:
        gen = {"name": "Baby Boomers", "range": "1946 – 1964", "tagline": "The Post-War Optimists"}
    elif year <= 1980:
        gen = {"name": "Generation X", "range": "1965 – 1980", "tagline": "The Self-Reliant Bridge Generation"}
    elif year <= 1996:
        gen = {"name": "Millennials (Gen Y)", "range": "1981 – 1996", "tagline": "The Digital Pioneers"}
    elif year <= 2012:
        gen = {"name": "Generation Z", "range": "1997 – 2012", "tagline": "The True Digital Natives"}
    else:
        gen = {"name": "Generation Alpha", "range": "2013 – Present", "tagline": "The AI & Spatial Generation"}

    return {
        "westernZodiac": zodiac,
        "chineseZodiac": chinese,
        "generation": gen
    }
