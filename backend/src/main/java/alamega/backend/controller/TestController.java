package alamega.backend.controller;

import alamega.backend.telegram.AlamegaTelegramBot;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import org.docx4j.Docx4J;
import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.openpackaging.parts.WordprocessingML.MainDocumentPart;
import org.docx4j.wml.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigInteger;

@Tag(name = "Тесты", description = "Тестю я тут всякое")
@RestController
@RequestMapping("/test")
public class TestController {
    private final AlamegaTelegramBot alamegaTelegramBot;

    public TestController(AlamegaTelegramBot alamegaTelegramBot) {
        this.alamegaTelegramBot = alamegaTelegramBot;
    }

    @Operation(summary = "Отдаёт .pdf")
    @GetMapping(value = "/pdf")
    @ResponseStatus(HttpStatus.OK)
    public void generatePDF(HttpServletResponse response) throws IOException, Docx4JException {
        WordprocessingMLPackage wordPackage = WordprocessingMLPackage.createPackage();
        MainDocumentPart mainDocumentPart = wordPackage.getMainDocumentPart();

        mainDocumentPart.addStyledParagraphOfText("Title", "Заголовок документа");
        mainDocumentPart.addStyledParagraphOfText("Heading1", "Раздел 1");
        mainDocumentPart.addParagraphOfText("Это обычный текст параграфа с описанием.");

        Tbl table = createSampleTable();
        mainDocumentPart.addObject(table);

        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=\"document.pdf\"");
        Docx4J.toPDF(wordPackage, response.getOutputStream());
    }

    private Tbl createSampleTable() {
        ObjectFactory factory = new ObjectFactory();
        Tbl table = factory.createTbl();

        TblBorders borders = factory.createTblBorders();

        CTBorder border = factory.createCTBorder();
        border.setVal(STBorder.SINGLE);
        border.setSz(BigInteger.valueOf(4));
        border.setColor("000000");

        borders.setTop(border);
        borders.setBottom(border);
        borders.setLeft(border);
        borders.setRight(border);
        borders.setInsideH(border);
        borders.setInsideV(border);

        TblPr tblPr = factory.createTblPr();
        tblPr.setTblBorders(borders);
        table.setTblPr(tblPr);

        Tr headerRow = factory.createTr();
        headerRow.getContent().add(createTableCell("Имя"));
        headerRow.getContent().add(createTableCell("Возраст"));
        headerRow.getContent().add(createTableCell("Город"));
        table.getContent().add(headerRow);

        Tr dataRow = factory.createTr();
        dataRow.getContent().add(createTableCell("Алексей"));
        dataRow.getContent().add(createTableCell("29"));
        dataRow.getContent().add(createTableCell("Минск"));
        table.getContent().add(dataRow);

        return table;
    }


    private Tc createTableCell(String text) {
        ObjectFactory factory = new ObjectFactory();
        Tc tableCell = factory.createTc();

        TcPr tcPr = factory.createTcPr();

        TblWidth width = factory.createTblWidth();
        width.setType("dxa");
        width.setW(BigInteger.valueOf(2400));
        tcPr.setTcW(width);

        TcMar tcMar = factory.createTcMar();
        TblWidth margin = factory.createTblWidth();
        margin.setW(BigInteger.valueOf(100));
        margin.setType("dxa");
        tcMar.setTop(margin);
        tcMar.setBottom(margin);
        tcMar.setLeft(margin);
        tcMar.setRight(margin);
        tcPr.setTcMar(tcMar);
        tableCell.setTcPr(tcPr);

        P paragraph = factory.createP();
        Text cellText = factory.createText();
        cellText.setValue(text);
        R run = factory.createR();
        run.getContent().add(cellText);
        paragraph.getContent().add(run);
        tableCell.getContent().add(paragraph);

        return tableCell;
    }

    @Operation(summary = "Наваливает бардак админу в ТГ")
    @PostMapping(value = "/tg")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.OK)
    public void sendMessageToAdminTG(@RequestBody String message) {
        alamegaTelegramBot.sendMessageToAdmin(message);
    }
}
