1. 
```
SELECT model, speed, hd FROM PC WHERE price < 500 UNION ALL SELECT model, speed, hd FROM Laptop WHERE price < 500
```
2. 
```
Select DISTINCT maker From Product Where type = 'Printer'
```
3. 
```
SELECT model, ram, screen From Laptop WHERE price > 1000
```
4. 
```
Select * From Printer WHERE color = 'y'
```
5. 
```
Select model, speed, hd From PC Where (cd = '12x' OR cd = '24x') AND price < 600
```
6. 
```
Select Product.maker, Laptop.speed FROM Laptop Join Product ON Laptop.model = Product.model AND Laptop.hd >= 10
```
7. 
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
8. 
```
SELECT DISTINCT maker
FROM Product
WHERE type = 'PC'
AND maker NOT IN (SELECT maker FROM Product WHERE type = 'Laptop')
```
9. 
```
Select DISTINCT maker from Product WHERE model IN
(SELECT model FROM PC WHERE speed >= 450)
```
10. 
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
16. 
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
17. 
```

```
18. 
```

```
19. 
```

```
20. 
```

```
21. 
```

```
22. 
```

```
23. 
```

```
24. 
```

```
25. 
```

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