1. Найдите номер модели, скорость и размер жесткого диска для всех ПК стоимостью менее 500 дол. Вывести: model, speed и hd
```
SELECT model, speed, hd FROM PC WHERE price < 500 UNION ALL SELECT model, speed, hd FROM Laptop WHERE price < 500
```
2. Найдите производителей принтеров. Вывести: maker
```
Select DISTINCT maker From Product Where type = 'Printer'
```
3. Найдите номер модели, объем памяти и размеры экранов ПК-блокнотов, цена которых превышает 1000 дол.
```
SELECT model, ram, screen From Laptop WHERE price > 1000
```
4. Найдите все записи таблицы Printer для цветных принтеров.
```
Select * From Printer WHERE color = 'y'
```
5. Найдите номер модели, скорость и размер жесткого диска ПК, имеющих 12x или 24x CD и цену менее 600 дол.
```
Select model, speed, hd From PC Where (cd = '12x' OR cd = '24x') AND price < 600
```
6. Для каждого производителя, выпускающего ПК-блокноты c объёмом жесткого диска не менее 10 Гбайт, найти скорости таких ПК-блокнотов. Вывод: производитель, скорость.
```
Select Product.maker, Laptop.speed FROM Laptop Join Product ON Laptop.model = Product.model AND Laptop.hd >= 10
```
7. Найдите номера моделей и цены всех имеющихся в продаже продуктов (любого типа) производителя B (латинская буква).
```
SELECT Product.model, PC.price
FROM Product
JOIN PC ON Product.model = PC.model
WHERE Product.maker = 'B'
	UNION
SELECT Product.model, Laptop.price
FROM Product
JOIN Laptop ON Product.model = Laptop.model
WHERE Product.maker = 'B'
	UNION
SELECT Product.model, Printer.price
FROM Product
JOIN Printer ON Product.model = Printer.model
WHERE Product.maker = 'B'
```
8. Найдите производителя, выпускающего ПК, но не ПК-блокноты.
```
SELECT DISTINCT maker
FROM Product
WHERE type = 'PC'
AND maker NOT IN (SELECT maker FROM Product WHERE type = 'Laptop')
```
9. Найдите производителей ПК с процессором не менее 450 Мгц. Вывести: Maker
```
Select DISTINCT maker from Product WHERE model IN
(SELECT model FROM PC WHERE speed >= 450)
```
10. Найдите модели принтеров, имеющих самую высокую цену. Вывести: model, price
```
Select model, price FROM Printer WHERE price = (SELECT MAX(price) FROM Printer)
```
11. Найдите среднюю скорость ПК.
```
SELECT AVG(speed) FROM PC
```
12. Найдите среднюю скорость ПК-блокнотов, цена которых превышает 1000 дол.
```
SELECT AVG(speed) FROM Laptop WHERE price > 1000
```
13. Найдите среднюю скорость ПК, выпущенных производителем A.
```
SELECT AVG(speed) From PC JOIN Product ON PC.model = Product.model AND Product.maker = 'A'
```
14. Найдите класс, имя и страну для кораблей из таблицы Ships, имеющих не менее 10 орудий.
```
SELECT Ships.class, Ships.name, Classes.country
FROM Ships
JOIN Classes ON Ships.class = Classes.class WHERE Classes.numGuns >= 10

```
15. Найдите размеры жестких дисков, совпадающих у двух и более PC. Вывести: HD
```
SELECT hd
FROM PC
GROUP BY hd
HAVING COUNT(*) > 1
```
16. Найдите пары моделей PC, имеющих одинаковые скорость и RAM. В результате каждая пара указывается только один раз, т.е. (i,j), но не (j,i), Порядок вывода: модель с большим номером, модель с меньшим номером, скорость и RAM.
```
SELECT DISTINCT 
    p1.model AS model_1,
    p2.model AS model_2,
    p1.speed,
    p1.ram
FROM 
    PC p1
JOIN 
    PC p2 ON p1.speed = p2.speed AND p1.ram = p2.ram
WHERE 
    p1.model > p2.model
ORDER BY 
    model_1 DESC, model_2 DESC;
```
17. Найдите модели ПК-блокнотов, скорость которых меньше скорости каждого из ПК.
Вывести: type, model, speed
```
Select 'Laptop' as type, model, speed FROM Laptop WHERE speed < ALL (Select speed FROM PC)
```
18. Найдите производителей самых дешевых цветных принтеров. Вывести: maker, price 
```
SELECT DISTINCT Product.maker, Printer.price
FROM Product
JOIN Printer ON Product.model = Printer.model
WHERE Printer.color = 'y'
AND Printer.price = (
    SELECT MIN(price)
    FROM Printer
    WHERE color = 'y'
)
```
19. Для каждого производителя, имеющего модели в таблице Laptop, найдите средний размер экрана выпускаемых им ПК-блокнотов.
Вывести: maker, средний размер экрана. 
```
Select Product.maker, AVG(Laptop.screen)
FROM Product
JOIN Laptop ON Product.model = Laptop.model
GROUP BY Product.maker
```
20. Найдите производителей, выпускающих по меньшей мере три различных модели ПК. Вывести: Maker, число моделей ПК. 
```
Select maker, COUNT(*) as Count_Model FROM Product
WHERE type = 'PC'
GROUP BY maker
HAVING COUNT(*) >= 3

```
21. Найдите максимальную цену ПК, выпускаемых каждым производителем, у которого есть модели в таблице PC.
Вывести: maker, максимальная цена. 
```
Select Product.maker, MAX(PC.price)
FROM Product
JOIN PC ON PC.model = Product.model
GROUP BY Product.maker
```
22. Для каждого значения скорости ПК, превышающего 600 МГц, определите среднюю цену ПК с такой же скоростью. Вывести: speed, средняя цена. 
```
Select speed, AVG(price) from PC
WHERE speed > 600
GROUP BY speed
```
23. Найдите производителей, которые производили бы как ПК со скоростью не менее 750 МГц, так и ПК-блокноты со скоростью не менее 750 МГц.
Вывести: Maker 
```
SELECT DISTINCT Product.maker
FROM Product
WHERE Product.type = 'PC'
AND Product.model IN (
    SELECT model FROM PC WHERE speed >= 750
)
AND Product.maker IN (
    SELECT maker
    FROM Product
    WHERE Product.type = 'Laptop' AND Product.model IN (
        SELECT model FROM Laptop WHERE speed >= 750
    )
)

```
24. Перечислите номера моделей любых типов, имеющих самую высокую цену по всей имеющейся в базе данных продукции. 
```
SELECT model
FROM (
    SELECT model, price FROM PC
    UNION ALL
    SELECT model, price FROM Laptop
    UNION ALL
    SELECT model, price FROM Printer
) AS AllProducts
WHERE price = (
    SELECT MAX(price)
    FROM (
        SELECT price FROM PC
        UNION ALL
        SELECT price FROM Laptop
        UNION ALL
        SELECT price FROM Printer
    ) AS AllPrices
)

```
25. Найдите производителей принтеров, которые производят ПК с наименьшим объемом RAM и с самым быстрым процессором среди всех ПК, имеющих наименьший объем RAM. Вывести: Maker 
```
SELECT DISTINCT maker FROM Product
WHERE type = 'Printer'
AND maker IN (
    SELECT maker
    FROM Product
    JOIN PC ON Product.model = PC.model
    WHERE PC.ram = (SELECT MIN(ram) FROM PC)
    AND PC.speed = (
        SELECT MAX(speed) 
        FROM PC 
        WHERE ram = (SELECT MIN(ram) FROM PC)
    )
)
```
26. 
```

```
27. 
```

```
28. 
```

```
29. 
```

```
30. 
```

```
31. 
```

```
32. 
```

```
33. 
```

```
34. 
```

```
35. 
```

```
36. 
```

```
37. 
```

```
38. 
```

```
39. 
```

```
40. 
```

```