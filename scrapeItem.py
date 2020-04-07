from bs4 import BeautifulSoup
from selenium import webdriver
#import requests

class ScrapeItem:
    def __init__(self, url):
        self.url = url

    driver = webdriver.Chrome() #opens up the website

    driver.get(url)
    #gives you the page source after loading the website
    res = driver.execute_script("return document.documentElement.outerHTML")


    soup = BeautifulSoup(res, 'lxml')

    for elm in soup.select(".ProductAttribute__value2___1VnqJ"):
        ingredient = elm.string
        print(ingredient)

    #ingredient = div.find('div', class_ = "ProductAttribute__value2___1VnqJ")
    driver.quit() #closes the web page / optional
