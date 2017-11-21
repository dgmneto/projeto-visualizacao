import csv

def remove_par(country):
    ok = False
    res = ''
    for i in range(len(country)):
        if country[i] == '(':
            ok = True
        elif country[i] == ')':
            ok = False
        elif not ok:
            res += country[i]
    return res

def parse_country(country):
    country = remove_par(country)
    ans = ''
    for i in range(len(country)):
        if country[i] == ' ' or country[i] == '\'':
            continue
        elif country[i] == 'ç':
            ans += 'c'
        elif country[i] >= 'A' and country[i] <= 'Z':
            ans += str(chr(ord(country[i]) - ord('A') + ord('a')))
        else:
            ans += country[i]
    return ans

conts = {}
first = True

c = ['South America', 'North America', 'Europe', 'Asia', 'Africa', 'Oceania', 'Antarctica']

'''
Não repetir isso jamais

Deus abençoe o rolê
Amém
'''

conts['aruba'] = c[0]
conts['curacao'] = c[0]
conts['Åland'] = c[2]
conts['americansamoa'] = c[5]
conts['anguilla'] = c[1]
conts['bakerisland'] = c[1]
conts['bonaire,sainteustatiusandsaba'] = c[0]
conts['britishvirginislands'] = c[1]
conts['burkinafaso'] = c[4]
conts['côtedivoire'] = c[4]
conts['caymanislands'] = c[1]
conts['christmasisland'] = c[3]
conts['falklandislands'] = c[6]
conts['faroeislands'] = c[2]
conts['federatedstatesofmicronesia'] = c[5]
conts['frenchguiana'] = c[0]
conts['frenchpolynesia'] = c[5]
conts['frenchsouthernandantarcticlands'] = c[6]
conts['gazastrip'] = c[3]
conts['greenland'] = c[1]
conts['guadeloupe'] = c[1]
conts['guam'] = c[5]
conts['guernsey'] = c[2]
conts['guineabissau'] = c[4]
conts['heardislandandmcdonaldislands'] = c[5]
conts['hongkong'] = c[3]
conts['jersey'] = c[2]
conts['macau'] = c[3]
conts['martinique'] = c[1]
conts['montserrat'] = c[1]
conts['newcaledonia'] = c[5]
conts['niue'] = c[5]
conts['northkorea'] = c[4]
conts['northernmarianaislands'] = c[5]
conts['palestina'] = c[3]
conts['puertorico'] = c[1]
conts['reunion'] = c[4]
conts['russia'] = c[3]
conts['southkorea'] = c[3]
conts['timorleste'] = c[3]
conts['taiwan'] = c[3]
conts['unitedstatesofamerica'] = c[1]
conts['antarctica'] = c[6]
conts['republicofthecongo'] = c[4]
conts['saintmartin'] = c[1]
conts['republicofserbia'] = c[2]
conts['virginislands'] = c[1]

with open('../data/countryContinent.csv', 'r') as csvfile:
    reader = csv.reader(csvfile)

    for r in reader:
        if first:
            first = not first
        else:
            conts[parse_country(r[1])] = r[0]

def retrieve_cont(country):
    if country in conts.keys():
        return conts[country]
    else:
        return 'Xablau'

data = []
no_continent = []

with open('../data/data.csv', 'r') as csvfile:
    reader = csv.reader(csvfile)

    for r in reader:
        if r[0] < '0' or r[0] > '9':
            data.append([r[0], r[1], r[2], 'Continent'])
        else:
            country = parse_country(r[2])
            cont = retrieve_cont(country)
            data.append([r[0], r[1], r[2], cont])

            if cont == 'Xablau':
                if r[2] not in no_continent:
                    print (country)
                    no_continent.append(r[2])

with open('../data/data2.csv', 'w') as csvfile:
    writer = csv.writer(csvfile)

    for x in range(len(data)):
        writer.writerow(data[x])

print (len(no_continent)) # Sem continente! (== Xablau)
