from http.client import HTTPResponse
import itertools
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.generic import View
from time import time
from wordle.words import all, answers
import random
from wordle.wordbank import wordToUse
from itertools import chain
from random import shuffle
# Create your views here.

def home(request):
    return render(request, 'index.html', {'name':'Castro'})

def game(request):
    return render(request, 'home.html' )

def add(request):
    val1 = int(request.GET['num1'])
    val2 = int(request.GET['num2'])
    res = val1 + val2
    return render(request, "index.html", {'result':res})

def add2(request):
    val3 = int(request.POST['num3'])
    val4 = int(request.POST['num4'])
    res = val3 + val4
    return render(request, "index.html", {'result':res})

def is_ajax(request):
        return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'

class AjaxHandlerView1(View):
    
    def get(self, request):
        text = request.GET.get('te')
        new = str(text)
        print(new)
        
        if is_ajax(request=request):
            if new == "5":
                new = "Great Success"
            else:
                new = "Ohh Nooo"

            return JsonResponse({'name': new}, status=200)
        return render(request, 'index.html')
r = random.randint(0,2309) 
class AjaxHandlerView2(View):
    
    def rand(self):
        return r
    
    def get(self, request):
        text = request.GET.get('guess')
        guess_st = str(text)
        
        
        r = self.rand()
        r_word = answers[r]
        r_word = list(r_word)
        
        #ran_num= "".join(str(e) for e in g)
        #h = int(ran_num1)
        #print(h)
       # r_word = list[r_word]
        guess_s = guess_st
        #print(guess_s) 
        guess = list(guess_s)
        
        #r_word = ['l', 'o', 'l', 'l', 'm']
        word = r_word
        r_word = ''.join(r_word)
        colours = ['', '', '', '', '']
        if is_ajax(request=request):
            if guess_s in all or guess_s in answers:
                for i in range(0, len(guess)):
                    if guess[i] == word[i]:
                        colours[i] = "#008000"
                        word[i] = '-'
                        guess[i] = '*'
                for i in range(0, len(guess)):
                    for j in range(0, len(guess)):
                        if guess[i] == word[j]:
                            colours[i] = '#ffc425'
                            word[j] = '-'
                            guess[i] = '*'
                for i in range(0, len(colours)):
                    if colours[i] == '' :  
                        colours[i] = "#A9A9A9"
                
                colours.append(r_word)
            else:
                colours[0] = "False"

                    

            return JsonResponse({'name': colours}, status=200)
        return render(request, 'home.html')

    



def word(request):
    words = wordToUse
    search = createSearch()
    boardset = search[0]
    searchWord = search[1]
    print(boardset)
    print(searchWord,'!')
    boardset = list(chain.from_iterable(boardset))
    print(boardset)
    boardset = ''.join([str(char) for char in boardset])
    return render(request, 'wordpage.html', {'boardSet': boardset, 'searchWords': searchWord})

def fillRest(board):
    gridSize = 20
    letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for row in range(0,20):
        for column in range(0,20):
            if board[row][column] == ' ':
                board[row][column] = random.choice(letters)
    return board

def createSearch():
    words = wordToUse
    board = [[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']]
    useWords =[]
    orientations = ['lToR', 'uToD', 'dU', 'dD']
    for i in range(0,5):
        useWords.append(random.choice(words).upper())
    for word in useWords:
        length = len(word)
        success = False
        while not success:
            orientation = random.choice(orientations)
            if orientation == 'lToR':
                xMove = 1
                yMove = 0
            if orientation == 'uToD':
                xMove = 0
                yMove = 1
            if orientation == 'dD':
                xMove = 1
                yMove = 1
            if orientation == 'dU':
                xMove = -1
                yMove = 1
            xPos = random.randint(0,19)
            yPos = random.randint(0,19)
            xEnd = xPos + length*xMove
            yEnd = yPos + length*yMove
            if xEnd < 0 or xEnd > 19: continue
            if yEnd < 0 or yEnd > 19: continue

            fail = False

            for i in range(length):
                character = word[i]

                xNew = xPos + i*xMove
                yNew = yPos + i*yMove

                charIn = board[xNew][yNew]
                if charIn != ' ':
                    if charIn == character:
                        continue
                    else:
                        fail = True
                        break
            if fail:
                continue
            else:
                for i in range(length):
                    character = word[i]
                    xNew = xPos + i*xMove
                    yNew = yPos + i*yMove
                    board[xNew][yNew] = character
                success = True
    fillRest(board)
    return board, useWords

def sudoku(request):
    grid = createSudoku([[' ',' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',' ',]])
    for i in range (58):
        remove = False
        while remove == False:
            row = random.randint(0,8)
            column = random.randint(0,8)
            if grid[row][column] != ' ': 
                grid[row][column] = ' '
                remove = True
    print(grid)
    print(grid[0])
    gridString = list(chain.from_iterable(grid))
    print(gridString)
    gridString = ''.join([str(char) for char in gridString])
    print('yo')
    print(gridString)
    print("hey")
    print(gridString ,'gridstring')
    return render(request, 'sudoku.html', {'gridString': gridString})


def gridFull(grid):
    for row in range(0,9):
        for column in range(0,9):
            if grid[row][column]== " ":
                return False
    return True

def createSudoku(grid):
        print(grid)
        nums = [1,2,3,4,5,6,7,8,9]
        for i in range(0,81):
            row = i//9
            column = i%9
            if grid[row][column] == ' ':
                shuffle(nums)
                for x in nums:
                    print(x)
                    if x not in grid[row]:
                        print("passed 1")
                        if x not in ([grid[0][column],grid[1][column],grid[2][column],grid[3][column],grid[4][column],grid[5][column],grid[6][column],grid[7][column],grid[8][column]]):
                            print("passed 2")
                            box = []
                            if row<3:
                                if column<3:
                                    box=[grid[j][0:3] for j in range(0,3)]
                                elif column <6 :
                                    box=[grid[j][3:6] for j in range(0,3)]
                                else:
                                    box=[grid[j][6:9] for j in range(0,3)]
                            elif row<6:
                                if column<3:
                                    box=[grid[j][0:3] for j in range(3,6)]
                                elif column <6 :
                                    box=[grid[j][3:6] for j in range(3,6)]
                                else:
                                    box=[grid[j][6:9] for j in range(3,6)]
                            elif row<9:
                                if column<3:
                                    box=[grid[j][0:3] for j in range(6,9)]
                                elif column <6 :
                                    box=[grid[j][3:6] for j in range(6,9)]
                                else:
                                    box=[grid[j][6:9] for j in range(6,9)]
                            if x not in box[0]and x not in box[1] and x not in box[2]:
                                grid[row][column] = x
                                if gridFull(grid) == True:
                                    return grid
                                else:
                                    new = createSudoku(grid)
                                    if new:
                                        return new
                break                                                    
        grid[row][column] = " "
