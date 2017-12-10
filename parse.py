import csv
from datetime import datetime

ignored = ['South America', 'Africa', 'Antarctica', 'Europe', 'United Kingdom (Europe)', 'Oceania', 'Netherlands (Europe)', 'Denmark (Europe)', 'France (Europe)', 'North America', 'Asia']

country = {}

with open('data/data.csv', 'r') as csvfile:
    reader = csv.reader(csvfile)

    for row in reader:
        if row[0][0] == 'd':
            continue 

        year = int(row[0][:4])
        if year >= 1850:
            temp = 0.0
            if len(row[1]) > 0:
                temp = float(row[1])

            if row[2] in country.keys():
                country[row[2]].append(temp)
            else:
                country[row[2]] = [temp]

def mse(x, y):
    if len(country[x]) != len(country[y]):
        return 1000000
    lim = range(len(country[x]))
    mse = 0.0
    for i in lim:
        mse += (country[x][i] - country[y][i]) * (country[x][i] - country[y][i])
    if len(country[x]) != 0:
        mse /= len(country[x])
    return mse

with open('data/similar.csv', 'w') as csvfile:
    writer = csv.writer(csvfile)

    writer.writerow(['country', 'first', 'second', 'third', 'fourth', 'fifth'])
    for x in country.keys():
        if x in ignored:
            continue
        diffs = []

        for c in country.keys():
            if c == x or c in ignored:
                continue

            diffs.append([mse(x, c), c])

        diffs.sort()
        writer.writerow([x, diffs[0][1], diffs[1][1], diffs[2][1], diffs[3][1], diffs[4][1]])