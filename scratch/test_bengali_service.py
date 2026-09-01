# scratch/test_bengali_service.py
import sys
import os
from datetime import datetime

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'python_backend')))

from services.bengali_service import get_bengali_date

print("================================================================")
print("PYTHON BENGALI SERVICE VERIFICATION: SEP 1 = 14 BHADRO")
print("================================================================\n")

dt_sep01 = datetime(2026, 9, 1, 12, 0, 0)
res = get_bengali_date(dt_sep01)

print(f"Date:         {dt_sep01.strftime('%Y-%m-%d')}")
print(f"Bengali Date: {res['formattedBn']}")
print(f"Day:          {res['day']}")
print(f"Month:        {res['monthNameBn']}")
print(f"Year:         {res['year']}")

assert res['day'] == 14, f"Expected Day 14, got {res['day']}"
assert res['monthNameBn'] == 'ভাদ্র', f"Expected Bhadro, got {res['monthNameBn']}"
assert res['year'] == 1433, f"Expected 1433, got {res['year']}"
assert "১৪ ভাদ্র, ১৪৩৩ বঙ্গাব্দ" in res['formattedBn']

print("\n================================================================")
print("SUCCESS: PYTHON BACKEND MATCHES EXACTLY!")
print("================================================================\n")
