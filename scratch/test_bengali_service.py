# scratch/test_bengali_service.py
import sys
import os
from datetime import datetime, timezone

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'python_backend')))

from services.bengali_service import get_bengali_date

print("================================================================")
print("🧪 PYTHON BENGALI SERVICE CONSISTENCY & VALIDATION TEST")
print("================================================================\n")

# Test 2026-09-01
dt_kolkata = datetime(2026, 9, 1, 11, 30, 0)
res = get_bengali_date(dt_kolkata)
print(f"Date: {dt_kolkata.strftime('%Y-%m-%d %H:%M:%S')}")
print(f"Bengali Date: {res['formattedBn']}")
print(f"Day: {res['day']}, Month: {res['monthNameBn']}, Year: {res['year']}")

assert res['day'] == 15, f"Expected Day 15, got {res['day']}"
assert res['monthNameBn'] == 'ভাদ্র', f"Expected Bhadro, got {res['monthNameBn']}"
assert res['year'] == 1433, f"Expected 1433, got {res['year']}"
assert "১৫ ভাদ্র, ১৪৩৩ বঙ্গাব্দ" in res['formattedBn']

# Test 2026-08-31
dt_aug31 = datetime(2026, 8, 31, 12, 0, 0)
res_aug31 = get_bengali_date(dt_aug31)
print(f"\nDate: {dt_aug31.strftime('%Y-%m-%d %H:%M:%S')}")
print(f"Bengali Date: {res_aug31['formattedBn']}")
assert res_aug31['day'] == 14, f"Expected Day 14, got {res_aug31['day']}"
assert res_aug31['monthNameBn'] == 'ভাদ্র', f"Expected Bhadro, got {res_aug31['monthNameBn']}"
assert "১৪ ভাদ্র, ১৪৩৩ বঙ্গাব্দ" in res_aug31['formattedBn']

print("\n================================================================")
print("🎉 PYTHON BENGALI SERVICE TESTS PASSED SUCCESSFULLY!")
print("================================================================\n")
