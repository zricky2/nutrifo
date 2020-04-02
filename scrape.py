from bs4 import BeautifulSoup
from selenium import webdriver
#import requests


#dynanmic webscraping

driver = webdriver.Chrome() #opens up the website

url= "https://grocery.walmart.com/ip/Great-Value-2-Reduced-Fat-Milk-1-Gallon-128-Fl-Oz/10450115?athcpid=10450115&athpgid=athenaGroceryHomepage&athcgid=null&athznid=null&athieid=null&athstid=CS014&athguid=466001f5-46cfa622-a290da589a18a716&athancid=null&athena=true"

driver.get(url)
#gives you the page source after loading the website
res = driver.execute_script("return document.documentElement.outerHTML")


soup = BeautifulSoup(res, 'lxml')

for elm in soup.select(".ProductAttribute__value2___1VnqJ"):
    ingredient = elm.string
    print(ingredient)

#ingredient = div.find('div', class_ = "ProductAttribute__value2___1VnqJ")
driver.quit() #closes the web page / optional
#print(table2.prettify())