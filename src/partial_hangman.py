def main(self):
    guessed = "_ " * len(correct_word)
    while True:
        if "_" not in guessed:
            print("Y O U  W O N!")
            print(correct_word, sep=" ")
            break
        print("\n" + self.__string__())
        if self.wrong == 6:
            break
        print(guessed)
        try:
            word = input("\nType in a word or a letter:\n").lower()
        except:
            print("Type in a word or a letter!")
            continue
        if word in self.already:
            print("\nYou already guessed this...\nTry something else!")
            continue
        if len(word) == 1:
            if word in correct_word:
                indexes = [i for i in range(len(correct_word)) if correct_word[i] == word]
                already_guessed = [i / 2 for i in range(len(guessed)) if guessed[i] != "_" and guessed[i] != " "]
                total = already_guessed + indexes
                guessed = ''
                for index in range(len(correct_word)):
                    if index in total:
                        guessed += correct_word[index] + " "
                    else:
                        guessed += "_ "
            else:
                print("\nThat letter was not in the word...\nBetter luck next time!")
                self.wrong += 1
        else:
            if word == correct_word:
                print("Y O U  W I N!")
                print(correct_word, sep=" ")
                break
            else:
                print("\nThat word was not the word...\nBetter luck next time!")
                self.wrong += 1
        self.already += [word]